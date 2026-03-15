import { useState, useEffect } from 'react';
import { Search, Loader2, BookOpen, Layers, AlignLeft, Languages, Save, CheckCircle2, Archive } from 'lucide-react';
import { analyzeSentences, SentenceAnalysisData } from '../services/geminiService';
import { useStore } from '../store/useStore';
import { useSentenceStore } from '../store/sentenceStore';
import { Link } from 'react-router-dom';

function SentenceResultCard({ data, index }: { data: SentenceAnalysisData; index: number }) {
  const { saveSentence } = useSentenceStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveSentence({
      sentence: data.original,
      result: data,
    });
    setSaved(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-stone-200 first:border-0 first:pt-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-xl font-bold text-stone-900">Sentence {index + 1}</h3>
        <button
          onClick={handleSave}
          disabled={saved}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            saved
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              : 'bg-white text-indigo-600 border border-indigo-200 hover:border-indigo-600 hover:bg-indigo-50 shadow-sm'
          }`}
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Sentence
            </>
          )}
        </button>
      </div>

      {/* Original Sentence */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 lg:p-6">
        <h4 className="text-[10px] lg:text-sm font-bold tracking-wider text-stone-400 uppercase mb-2 lg:mb-3">Original</h4>
        <p className="text-stone-800 text-lg font-serif">{data.original}</p>
      </div>

      {/* Translation */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 lg:p-6">
        <div className="flex items-center gap-2 mb-3">
          <Languages className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-stone-800">Translation</h2>
        </div>
        <p className="text-stone-700 leading-relaxed">{data.translation}</p>
      </div>

      {/* Structure Analysis */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 lg:p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlignLeft className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg font-bold text-stone-800">Structure Analysis</h2>
        </div>
        <div className="space-y-4">
          {data.structure.map((item, idx) => (
            <div key={idx} className="flex flex-col lg:flex-row gap-2 lg:gap-4 p-3 bg-stone-50 rounded-lg border border-stone-100">
              <div className="lg:w-1/4 shrink-0">
                <span className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md">
                  {item.part}
                </span>
              </div>
              <div className="lg:w-3/4 space-y-1">
                <p className="font-medium text-stone-800 font-serif">"{item.content}"</p>
                <p className="text-sm text-stone-600">{item.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vocabulary */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-stone-800">Vocabulary & Usages</h2>
          </div>
          {data.vocabulary.length > 0 ? (
            <ul className="space-y-4">
              {data.vocabulary.map((item, idx) => (
                <li key={idx} className="flex flex-col p-3 bg-stone-50 rounded-lg border border-stone-100">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-stone-900 text-lg">{item.word}</span>
                    <span className="text-sm font-medium text-indigo-600">{item.meaning}</span>
                  </div>
                  <p className="text-sm text-stone-600 mt-1"><span className="font-semibold text-stone-500">Usage:</span> {item.usage}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-stone-500 italic">No uncommon words found.</p>
          )}
        </div>

        {/* Grammar Points */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-stone-800">Grammar Points</h2>
          </div>
          {data.grammarPoints.length > 0 ? (
            <ul className="space-y-3">
              {data.grammarPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-stone-700">
                  <span className="text-indigo-500 mt-1">•</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-stone-500 italic">No specific grammar points highlighted.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SentenceAnalyzer() {
  const { lastSentenceAnalysis, setLastSentenceAnalysis } = useStore();
  
  const [text, setText] = useState(lastSentenceAnalysis?.query || '');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<SentenceAnalysisData[] | null>(lastSentenceAnalysis?.result || null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLastSentenceAnalysis(text, results);
  }, [text, results, setLastSentenceAnalysis]);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setError('');
    setResults(null);

    try {
      const data = await analyzeSentences(text);
      setResults(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze the text. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-stone-900 mb-2">Sentence Analyzer</h1>
          <p className="text-stone-500">Paste one or more complex sentences to get a detailed breakdown of their structure, vocabulary, and meaning.</p>
        </div>
        <Link
          to="/saved-sentences"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors shadow-sm whitespace-nowrap"
        >
          <Archive className="w-4 h-4" />
          Saved Sentences
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4 lg:p-6 mb-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter English text here (can be multiple sentences)..."
          className="w-full h-32 p-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-stone-800"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !text.trim()}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Analyze Sentences
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-8 border border-red-100">
          {error}
        </div>
      )}

      {results && results.length > 0 && (
        <div className="space-y-12">
          {results.map((result, index) => (
            <SentenceResultCard key={index} data={result} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
