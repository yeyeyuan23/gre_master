import { useState } from 'react';
import { useSentenceStore } from '../store/sentenceStore';
import { Trash2, ChevronDown, ChevronUp, Calendar, AlignLeft, Languages, BookOpen, Layers } from 'lucide-react';

export default function SavedSentences() {
  const { savedSentences, deleteSentence } = useSentenceStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (savedSentences.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <header className="mb-6 lg:mb-10">
          <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-stone-900 mb-2">Saved Sentences</h1>
          <p className="text-stone-500 text-base lg:text-lg">Your analyzed sentences history.</p>
        </header>
        <div className="bg-white p-8 lg:p-12 rounded-2xl lg:rounded-3xl shadow-sm border border-stone-200 text-center">
          <AlignLeft className="w-12 h-12 lg:w-16 lg:h-16 text-stone-300 mx-auto mb-4" />
          <h3 className="text-lg lg:text-xl font-bold text-stone-900 mb-2">No saved sentences yet</h3>
          <p className="text-stone-500 text-sm lg:text-base">Analyze a sentence and save it to see your history here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <header className="mb-6 lg:mb-10">
        <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-stone-900 mb-2">Saved Sentences</h1>
        <p className="text-stone-500 text-base lg:text-lg">Review your past sentence analyses.</p>
      </header>

      <div className="space-y-4 lg:space-y-6">
        {savedSentences.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            {/* Header / Summary */}
            <div 
              className="p-4 lg:p-6 cursor-pointer hover:bg-stone-50 transition-colors flex items-center justify-between gap-4"
              onClick={() => toggleExpand(item.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                  <span className="flex items-center gap-1 text-[10px] lg:text-sm text-stone-500">
                    <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-base lg:text-lg font-bold text-stone-900 truncate">
                  {item.sentence}
                </h3>
              </div>
              <div className="flex items-center gap-2 lg:gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSentence(item.id);
                  }}
                  className="p-1.5 lg:p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg lg:rounded-xl transition-colors"
                  title="Delete saved sentence"
                >
                  <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
                {expandedId === item.id ? (
                  <ChevronUp className="w-5 h-5 lg:w-6 lg:h-6 text-stone-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 lg:w-6 lg:h-6 text-stone-400" />
                )}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === item.id && (
              <div className="p-4 lg:p-6 border-t border-stone-100 bg-stone-50/30 space-y-6 lg:space-y-8">
                {/* Original Sentence */}
                <div>
                  <h4 className="text-[10px] lg:text-sm font-bold tracking-wider text-stone-400 uppercase mb-2 lg:mb-3">Original Sentence</h4>
                  <div className="p-3 lg:p-4 bg-white border border-stone-200 rounded-xl lg:rounded-2xl text-stone-700 whitespace-pre-wrap text-xs lg:text-sm">
                    {item.sentence}
                  </div>
                </div>

                {/* Translation */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 lg:p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Languages className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-lg font-bold text-stone-800">Translation</h2>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{item.result.translation}</p>
                </div>

                {/* Structure Analysis */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 lg:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlignLeft className="w-5 h-5 text-indigo-500" />
                    <h2 className="text-lg font-bold text-stone-800">Structure Analysis</h2>
                  </div>
                  <div className="space-y-4">
                    {item.result.structure.map((part, index) => (
                      <div key={index} className="flex flex-col lg:flex-row gap-2 lg:gap-4 p-3 bg-stone-50 rounded-lg border border-stone-100">
                        <div className="lg:w-1/4 shrink-0">
                          <span className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md">
                            {part.part}
                          </span>
                        </div>
                        <div className="lg:w-3/4 space-y-1">
                          <p className="font-medium text-stone-800 font-serif">"{part.content}"</p>
                          <p className="text-sm text-stone-600">{part.explanation}</p>
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
                    {item.result.vocabulary.length > 0 ? (
                      <ul className="space-y-4">
                        {item.result.vocabulary.map((vocab, index) => (
                          <li key={index} className="flex flex-col p-3 bg-stone-50 rounded-lg border border-stone-100">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="font-bold text-stone-900 text-lg">{vocab.word}</span>
                              <span className="text-sm font-medium text-indigo-600">{vocab.meaning}</span>
                            </div>
                            <p className="text-sm text-stone-600 mt-1"><span className="font-semibold text-stone-500">Usage:</span> {vocab.usage}</p>
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
                    {item.result.grammarPoints.length > 0 ? (
                      <ul className="space-y-3">
                        {item.result.grammarPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-stone-700">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
