import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle, BookOpen, PenTool, LayoutList, Quote, Sparkles, Save, Archive } from 'lucide-react';
import { gradeEssay, EssayFeedback } from '../services/geminiService';
import { useEssayStore } from '../store/essayStore';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export default function EssayGrader() {
  const { lastEssayGrader, setLastEssayGrader } = useStore();
  const [prompt, setPrompt] = useState(lastEssayGrader?.prompt || '');
  const [essay, setEssay] = useState(lastEssayGrader?.essay || '');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<EssayFeedback | null>(lastEssayGrader?.feedback || null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const { saveEssay } = useEssayStore();

  useEffect(() => {
    setLastEssayGrader(prompt, essay, feedback);
  }, [prompt, essay, feedback, setLastEssayGrader]);

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !essay.trim()) return;

    setLoading(true);
    setError('');
    setFeedback(null);
    setSaved(false);

    try {
      const result = await gradeEssay(prompt.trim(), essay.trim());
      setFeedback(result);
    } catch (err) {
      setError('Failed to grade essay. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (feedback) {
      saveEssay({
        prompt: prompt.trim(),
        essay: essay.trim(),
        feedback,
      });
      setSaved(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <header className="mb-6 lg:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-stone-900 mb-2">Essay Grader</h1>
          <p className="text-stone-500 text-base lg:text-lg">Get strict, official-style grading and 4.0+ level revisions.</p>
        </div>
        <Link
          to="/saved-essays"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors shadow-sm whitespace-nowrap"
        >
          <Archive className="w-4 h-4" />
          Saved Essays
        </Link>
      </header>

      <div className="space-y-8 lg:space-y-12">
        {/* Input Section */}
        <div className="bg-white p-5 lg:p-8 rounded-2xl lg:rounded-3xl shadow-sm border border-stone-200">
          <form onSubmit={handleGrade} className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-[10px] lg:text-sm font-bold tracking-wider text-stone-400 uppercase mb-2 lg:mb-3">
                Essay Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setSaved(false);
                }}
                placeholder="Paste the GRE writing prompt here..."
                className="w-full p-3 lg:p-4 bg-stone-50 border border-stone-200 rounded-xl lg:rounded-2xl text-stone-800 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[100px] lg:min-h-[120px] resize-y"
                required
              />
            </div>

            <div>
              <label htmlFor="essay" className="block text-[10px] lg:text-sm font-bold tracking-wider text-stone-400 uppercase mb-2 lg:mb-3">
                Your Essay
              </label>
              <textarea
                id="essay"
                value={essay}
                onChange={(e) => {
                  setEssay(e.target.value);
                  setSaved(false);
                }}
                placeholder="Paste your essay here..."
                className="w-full p-3 lg:p-4 bg-stone-50 border border-stone-200 rounded-xl lg:rounded-2xl text-stone-800 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[250px] lg:min-h-[300px] resize-y"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim() || !essay.trim()}
              className="w-full py-3 lg:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl lg:rounded-2xl transition-colors disabled:opacity-50 flex items-center justify-center gap-3 text-base lg:text-lg shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" />
                  Grading...
                </>
              ) : (
                <>
                  <PenTool className="w-5 h-5 lg:w-6 lg:h-6" />
                  Grade My Essay
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {(feedback || loading) && (
          <div className="space-y-12">
            {loading ? (
              <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-stone-200 rounded-3xl bg-stone-50/50 animate-pulse">
                <Loader2 className="w-16 h-16 text-indigo-400 mb-6 animate-spin" />
                <h3 className="text-xl font-bold text-stone-900 mb-2">Grading your essay...</h3>
                <p className="text-stone-500 max-w-sm">
                  Our AI is analyzing your essay sentence by sentence. This might take a few seconds.
                </p>
              </div>
            ) : feedback ? (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8 lg:space-y-12">
                {/* Score Card */}
                <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-stone-200 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="text-center lg:text-left">
                    <h2 className="text-[10px] lg:text-sm font-bold tracking-wider text-stone-400 uppercase mb-1 lg:mb-2">Estimated Score</h2>
                    <p className="text-stone-500 text-xs lg:text-base">Based on official GRE criteria</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8 w-full lg:w-auto">
                    <div className="text-5xl lg:text-7xl font-bold text-indigo-600 tracking-tighter">
                      {feedback.score?.toFixed(1) || '0.0'}
                      <span className="text-2xl lg:text-3xl text-stone-300 ml-1">/6.0</span>
                    </div>
                    <button
                      onClick={handleSave}
                      disabled={saved}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl lg:rounded-2xl font-bold transition-all ${
                        saved
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-white text-indigo-600 border-2 border-indigo-100 hover:border-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      {saved ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Saved
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Save Essay
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-indigo-50 rounded-2xl lg:rounded-3xl border border-indigo-100 p-6 lg:p-8">
                  <h3 className="text-lg lg:text-xl font-bold text-indigo-900 flex items-center gap-3 mb-4 lg:mb-6">
                    <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" />
                    Key Takeaways
                  </h3>
                  <ul className="space-y-3">
                    {(feedback.summary || []).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-indigo-800 text-sm lg:text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sentence by Sentence Analysis */}
                <div className="space-y-4 lg:space-y-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-stone-900 flex items-center gap-3 pb-2">
                    <LayoutList className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-500" />
                    Sentence-by-Sentence Analysis
                  </h3>
                  
                  <div className="space-y-6 lg:space-y-8">
                    {(feedback.sentenceReviews || []).map((review, idx) => (
                      <div key={idx} className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
                        {/* Original */}
                        <div className="p-5 lg:p-6 border-b border-stone-100 bg-stone-50/50">
                          <div className="flex gap-3 lg:gap-4">
                            <Quote className="w-4 h-4 lg:w-5 lg:h-5 text-stone-400 flex-shrink-0 mt-1" />
                            <p className="text-stone-800 text-base lg:text-lg leading-relaxed">{review.original}</p>
                          </div>
                        </div>
                        
                        {/* Critique */}
                        <div className="p-5 lg:p-6 border-b border-stone-100">
                          <div className="flex gap-3 lg:gap-4">
                            <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500 flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="text-[10px] lg:text-xs font-bold tracking-wider text-stone-400 uppercase mb-1 lg:mb-2">Critique</h4>
                              <p className="text-stone-600 text-sm lg:text-base leading-relaxed">{review.critique}</p>
                            </div>
                          </div>
                        </div>

                        {/* Revised */}
                        <div className="p-5 lg:p-6 bg-indigo-50/30">
                          <div className="flex gap-3 lg:gap-4">
                            <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-500 flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="text-[10px] lg:text-xs font-bold tracking-wider text-indigo-400 uppercase mb-1 lg:mb-2">Revised Version</h4>
                              <p className="text-indigo-900 text-sm lg:text-base font-medium leading-relaxed">{review.revised}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Revised Essay */}
                <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-stone-200 p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-stone-900 flex items-center gap-3 border-b border-stone-100 pb-4 mb-4 lg:mb-6">
                    <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-500" />
                    Full 4.0+ Level Revision
                  </h3>
                  <div className="prose prose-stone prose-sm lg:prose-base max-w-none">
                    {(feedback.revisedEssay || '').split('\n').map((paragraph, idx) => (
                      <p key={idx} className="text-stone-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
