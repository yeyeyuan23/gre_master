import React, { useState, useEffect } from 'react';
import { Key, ExternalLink, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

interface ApiKeyGuardProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function ApiKeyGuard({ children }: ApiKeyGuardProps) {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const { needsKeySelection, setNeedsKeySelection } = useStore();

  const checkKey = async () => {
    try {
      // Check server status first
      const statusRes = await fetch('/api/status');
      if (!statusRes.ok) {
        throw new Error(`Server status check failed: ${statusRes.status}`);
      }
      const status = await statusRes.json();
      
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        // We need both the client to have selected it AND the server to have it in its environment
        setHasKey(selected && status.hasApiKey && !needsKeySelection);
      } else {
        // If not in AI Studio environment, assume key is provided via env
        setHasKey(status.hasApiKey || status.hasGeminiApiKey);
      }
    } catch (error) {
      console.error('Error checking API key:', error);
      // Don't immediately block if it's just a network glitch, but log it
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected && !needsKeySelection);
      } else {
        setHasKey(false);
      }
    }
  };

  useEffect(() => {
    if (needsKeySelection) {
      setHasKey(false);
    }
    checkKey();
  }, [needsKeySelection]);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success and proceed as per guidelines to avoid race conditions
      setNeedsKeySelection(false);
      setHasKey(true);
    }
  };

  if (hasKey === null) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="animate-pulse text-stone-400 font-medium">Checking configuration...</div>
      </div>
    );
  }

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-stone-200 p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Key className="w-8 h-8 text-amber-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-stone-900 mb-4">
            Paid API Key Required
          </h2>
          
          <p className="text-stone-600 mb-8 leading-relaxed">
            To use high-performance models (like Gemini 3.1 Pro) and avoid "High Demand" errors, 
            you need to select a paid API key from your Google Cloud project.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleSelectKey}
              className="w-full bg-stone-900 text-white py-3 px-6 rounded-xl font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              Select API Key
            </button>
            
            <button
              onClick={() => {
                setNeedsKeySelection(true);
                checkKey();
              }}
              className="w-full bg-white text-stone-600 border border-stone-200 py-2 px-6 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
            >
              Troubleshoot / Refresh Key
            </button>
            
            <a
              href="https://ai.google.dev/gemini-api/docs/billing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              Learn about Gemini API billing
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="mt-8 p-4 bg-stone-50 rounded-xl border border-stone-100 flex gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-500 leading-normal space-y-2">
              <p><strong>Common Fixes:</strong></p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Ensure your Google Cloud project has <strong>billing enabled</strong>.</li>
                <li>Verify the <strong>Generative Language API</strong> is active in your project.</li>
                <li>Try selecting a different API key or project if the current one fails.</li>
              </ul>
              <p className="mt-2">
                If you've already selected a key and still see this, 
                please ensure your project meets the requirements above.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
