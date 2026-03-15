import { useState, useEffect } from 'react';
import { Search, Star, Volume2, Loader2, Check, Brain, List, Plus, Trash2, Save } from 'lucide-react';
import { lookupWord, WordData } from '../services/geminiService';
import { useStore } from '../store/useStore';

export default function VocabularySearch() {
  const { favorites, addFavorite, removeFavorite, lastSearch, setLastSearch } = useStore();
  
  const [query, setQuery] = useState(lastSearch?.query || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<WordData[]>(lastSearch?.results || []);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    setLastSearch(query, results);
  }, [query, results, setLastSearch]);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Split by spaces, commas, or newlines
    const words = query.split(/[\s,，\n]+/).map(w => w.trim()).filter(w => w.length > 0);

    if (words.length === 0) return;

    setLoading(true);
    setError('');
    setResults([]);
    setProgress({ current: 0, total: words.length });
    
    const newResults: WordData[] = [];
    
    try {
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        setProgress(prev => ({ ...prev, current: i + 1 }));
        try {
          const data = await lookupWord(word);
          newResults.push(data);
          setResults([...newResults]);
        } catch (err) {
          console.error(`Failed to fetch word: ${word}`, err);
        }
      }
      
      if (newResults.length === 0) {
        setError('Failed to fetch word details. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (wordData: WordData) => {
    if (favorites[wordData.word]) {
      removeFavorite(wordData.word);
    } else {
      addFavorite(wordData);
    }
  };

  const saveAll = () => {
    results.forEach(result => {
      if (!favorites[result.word]) {
        addFavorite(result);
      }
    });
  };

  const playAudio = async (text: string) => {
    try {
      const audio = new Audio(`https://api.dictionaryapi.dev/media/pronunciations/en/${text.toLowerCase()}-us.mp3`);
      await audio.play();
    } catch (err) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <header className="mb-6 lg:mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mb-2">Vocabulary Search</h1>
        <p className="text-stone-500 text-lg">Master GRE vocabulary with deep context and native usage.</p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-8">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for words (e.g. 'apple banana cherry')..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 rounded-xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex justify-between items-center">
            {loading && progress.total > 1 && (
              <div className="text-sm font-medium text-stone-500">
                Processing: {progress.current} / {progress.total}
              </div>
            )}
            <div className="flex-1"></div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl mb-8">
          {error}
        </div>
      )}

      {loading && results.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden animate-pulse">
          <div className="p-8 border-b border-stone-100 flex justify-between items-start">
            <div>
              <div className="h-10 bg-stone-200 rounded-lg w-48 mb-4"></div>
              <div className="h-6 bg-stone-200 rounded-lg w-32"></div>
            </div>
            <div className="h-10 bg-stone-200 rounded-xl w-32"></div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-8">
          {results.length > 1 && !loading && (
            <div className="flex justify-end">
              <button
                onClick={saveAll}
                className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold rounded-xl transition-all shadow-sm"
              >
                <Save className="w-5 h-5" />
                Save All {results.length} Words
              </button>
            </div>
          )}
          
          {results.map((result, index) => (
            <WordCard 
              key={`${result.word}-${index}`}
              result={result}
              isFavorite={!!favorites[result.word]}
              onToggleFavorite={() => toggleFavorite(result)}
              onPlayAudio={() => playAudio(result.word)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WordCard({ result, isFavorite, onToggleFavorite, onPlayAudio }: { 
  result: WordData, 
  isFavorite: boolean, 
  onToggleFavorite: () => void,
  onPlayAudio: () => void 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="px-8 py-6 bg-white border-b border-stone-100 flex flex-col sm:flex-row justify-between items-start gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-1">
            <h2 className="text-4xl font-bold tracking-tight text-stone-900">{result.word}</h2>
            <button
              onClick={onPlayAudio}
              className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-colors"
              title="Listen to pronunciation"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xl font-mono text-indigo-600 font-medium">{result.pronunciation}</p>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`relative z-10 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all ${
            isFavorite 
              ? 'bg-amber-400 text-stone-900 hover:bg-amber-300' 
              : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          {isFavorite ? (
            <>
              <Check className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Star className="w-4 h-4" />
              Save
            </>
          )}
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Meanings & Mnemonics */}
        <div className="space-y-6">
          <section className="bg-stone-50 p-5 rounded-xl border border-stone-100">
            <h3 className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-2">Chinese Meaning</h3>
            <p className="text-lg text-stone-900 font-medium leading-relaxed">{result.chineseMeaning}</p>
          </section>

          <section className="bg-stone-50 p-5 rounded-xl border border-stone-100">
            <h3 className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-2">English Definition</h3>
            <p className="text-lg text-stone-700 leading-relaxed font-serif">
              "{result.englishMeaning}"
            </p>
          </section>

          <section className="bg-amber-50/50 p-5 rounded-xl border border-amber-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Brain className="w-16 h-16 text-amber-900" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-amber-700" />
              <h3 className="text-xs font-bold tracking-wider text-amber-900/70 uppercase">Mnemonics</h3>
            </div>
            <p className="text-base text-stone-800 leading-relaxed relative z-10">
              {result.memoryAid}
            </p>
          </section>
        </div>

        {/* Right Column: Collocations & Usage */}
        <div className="space-y-6">
          <section className="bg-stone-50 p-5 rounded-xl border border-stone-100">
            <h3 className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-3">Collocations</h3>
            <ul className="space-y-2">
              {(result.collocations || []).map((col, idx) => (
                <li key={idx} className="flex items-center gap-2 text-stone-700 font-medium text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                  {col}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-bold tracking-wider text-stone-500 uppercase mb-3">Contextual Usage</h3>
            <div className="space-y-3">
              {(result.sentences || []).map((sent, idx) => (
                <div key={idx} className="p-4 bg-white border border-stone-100 rounded-xl">
                  <p className="text-stone-900 text-base font-medium leading-relaxed mb-1">
                    {sent.english}
                  </p>
                  <p className="text-stone-500 text-sm pl-0">
                    {sent.chinese}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
