import { useState } from 'react';
import { Search, Star, Volume2, Loader2, Check } from 'lucide-react';
import { lookupWord, WordData } from '../services/geminiService';
import { useStore } from '../store/useStore';

export default function VocabularySearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WordData | null>(null);
  const [error, setError] = useState('');
  
  const { favorites, addFavorite, removeFavorite } = useStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const data = await lookupWord(query.trim());
      setResult(data);
    } catch (err) {
      setError('Failed to fetch word details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = result ? !!favorites[result.word] : false;

  const toggleFavorite = () => {
    if (!result) return;
    if (isFavorite) {
      removeFavorite(result.word);
    } else {
      addFavorite(result);
    }
  };

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-2">Vocabulary Search</h1>
        <p className="text-stone-500 text-lg">Master GRE vocabulary with deep context and native usage.</p>
      </header>

      <form onSubmit={handleSearch} className="relative mb-12">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-6 h-6 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a word (e.g., ephemeral)..."
            className="w-full pl-14 pr-32 py-4 bg-white border border-stone-200 rounded-2xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl mb-8">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 border-b border-stone-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-4xl font-bold text-stone-900">{result.word}</h2>
                <button
                  onClick={() => playAudio(result.word)}
                  className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
              <p className="text-xl font-mono text-stone-500">{result.pronunciation}</p>
            </div>
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                isFavorite 
                  ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' 
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {isFavorite ? (
                <>
                  <Check className="w-5 h-5" />
                  Saved
                </>
              ) : (
                <>
                  <Star className="w-5 h-5" />
                  Save Word
                </>
              )}
            </button>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <section>
                <h3 className="text-sm font-bold tracking-wider text-stone-400 uppercase mb-3">Chinese Meaning</h3>
                <p className="text-lg text-stone-800">{result.chineseMeaning}</p>
              </section>

              <section>
                <h3 className="text-sm font-bold tracking-wider text-stone-400 uppercase mb-3">English Meaning</h3>
                <p className="text-lg text-stone-800 leading-relaxed">{result.englishMeaning}</p>
              </section>

              <section>
                <h3 className="text-sm font-bold tracking-wider text-stone-400 uppercase mb-3">Collocations</h3>
                <ul className="space-y-2">
                  {(result.collocations || []).map((col, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-stone-700 bg-stone-50 px-3 py-2 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      {col}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-bold tracking-wider text-stone-400 uppercase mb-3">Example Sentences</h3>
              {(result.sentences || []).map((sent, idx) => (
                <div key={idx} className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                  <p className="text-stone-900 font-medium leading-relaxed mb-2">{sent.english}</p>
                  <p className="text-stone-500 text-sm">{sent.chinese}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
