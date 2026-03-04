import { useState } from 'react';
import { useEssayStore, SavedEssay } from '../store/essayStore';
import { Trash2, ChevronDown, ChevronUp, Calendar, FileText, CheckCircle2, LayoutList, BookOpen, Quote, AlertCircle, Sparkles } from 'lucide-react';

export default function SavedEssays() {
  const { savedEssays, deleteEssay } = useEssayStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (savedEssays.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-2">Saved Essays</h1>
          <p className="text-stone-500 text-lg">Your graded essays history.</p>
        </header>
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-stone-200 text-center">
          <FileText className="w-16 h-16 text-stone-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-stone-900 mb-2">No saved essays yet</h3>
          <p className="text-stone-500">Grade an essay and save it to see your history here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-2">Saved Essays</h1>
        <p className="text-stone-500 text-lg">Review your past essays and feedback.</p>
      </header>

      <div className="space-y-6">
        {savedEssays.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            {/* Header / Summary */}
            <div 
              className="p-6 cursor-pointer hover:bg-stone-50 transition-colors flex items-center justify-between gap-4"
              onClick={() => toggleExpand(item.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">
                    Score: {item.feedback.score?.toFixed(1) || 'N/A'}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-stone-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 truncate">
                  {item.prompt}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEssay(item.id);
                  }}
                  className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  title="Delete saved essay"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                {expandedId === item.id ? (
                  <ChevronUp className="w-6 h-6 text-stone-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-stone-400" />
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === item.id && (
              <div className="p-6 border-t border-stone-100 bg-stone-50/30 space-y-8">
                {/* Original Essay */}
                <div>
                  <h4 className="text-sm font-bold tracking-wider text-stone-400 uppercase mb-3">Original Essay</h4>
                  <div className="p-4 bg-white border border-stone-200 rounded-2xl text-stone-700 whitespace-pre-wrap text-sm">
                    {item.essay}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6">
                  <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2">
                    {(item.feedback.summary || []).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-indigo-800 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sentence by Sentence */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <LayoutList className="w-5 h-5 text-indigo-500" />
                    Sentence-by-Sentence Analysis
                  </h3>
                  
                  <div className="space-y-4">
                    {(item.feedback.sentenceReviews || []).map((review, idx) => (
                      <div key={idx} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden text-sm">
                        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
                          <div className="flex gap-3">
                            <Quote className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                            <p className="text-stone-800 leading-relaxed">{review.original}</p>
                          </div>
                        </div>
                        <div className="p-4 border-b border-stone-100">
                          <div className="flex gap-3">
                            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-stone-600 leading-relaxed">{review.critique}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-indigo-50/30">
                          <div className="flex gap-3">
                            <Sparkles className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-indigo-900 font-medium leading-relaxed">{review.revised}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Revised Essay */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3 mb-4">
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                    Full 4.0+ Level Revision
                  </h3>
                  <div className="prose prose-stone prose-sm max-w-none">
                    {(item.feedback.revisedEssay || '').split('\n').map((paragraph, idx) => (
                      <p key={idx} className="text-stone-700 leading-relaxed mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
