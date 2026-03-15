import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { useStore } from '../store/useStore';
import { RefreshCw, Check, X, Volume2, Play, Trash2, Brain } from 'lucide-react';
import { SavedWord } from '../store/useStore';

export default function Flashcards() {
  const { favorites, updateWeight, removeFavorite, flashcardState, setFlashcardState } = useStore();
  const { deck, currentIndex, isFlipped, isReviewing, reviewLimit } = flashcardState;

  // Initialize deck only when starting review
  const startReview = (limit: number | 'all') => {
    const words = Object.values(favorites);
    // Sort by weight descending (higher weight = needs more review)
    words.sort((a, b) => b.weight - a.weight);
    
    const limitedWords = limit === 'all' ? words : words.slice(0, limit);
    setFlashcardState({
      deck: limitedWords,
      currentIndex: 0,
      isFlipped: false,
      isReviewing: true,
      reviewLimit: limit
    });
  };

  const currentWord = deck[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentWord) return;

    if (direction === 'left') {
      // Didn't know it -> increase weight
      updateWeight(currentWord.word, 1);
    } else {
      // Knew it -> decrease weight
      updateWeight(currentWord.word, -1);
    }

    setFlashcardState({
      isFlipped: false,
      currentIndex: currentIndex + 1
    });
  };

  const playAudio = async (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    
    try {
      // Try dictionary API first
      const audio = new Audio(`https://api.dictionaryapi.dev/media/pronunciations/en/${text.toLowerCase()}-us.mp3`);
      await audio.play();
    } catch (err) {
      // Fallback to Web Speech API
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower for clearer pronunciation
      window.speechSynthesis.speak(utterance);
    }
  };

  const totalFavorites = Object.keys(favorites).length;

  if (totalFavorites === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6">
          <RefreshCw className="w-10 h-10 text-stone-400" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">No words to review</h2>
        <p className="text-stone-500 max-w-md">
          Go to the Vocabulary Search page and save some words to start reviewing.
        </p>
      </div>
    );
  }

  if (!isReviewing) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <header className="mb-6 lg:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-stone-900 mb-1 lg:mb-2">Saved Words</h1>
            <p className="text-stone-500 text-sm lg:text-lg">You have {totalFavorites} words in your collection.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200">
              {[20, 50, 100, 'all'].map((val) => (
                <button
                  key={val}
                  onClick={() => setFlashcardState({ reviewLimit: val as any })}
                  className={`flex-1 sm:flex-none px-3 lg:px-4 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all ${
                    reviewLimit === val 
                      ? 'bg-white text-stone-900 shadow-sm' 
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  {val === 'all' ? 'All' : val}
                </button>
              ))}
            </div>
            <button
              onClick={() => startReview(reviewLimit)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Play className="w-5 h-5" />
              Start Review
            </button>
          </div>
        </header>

        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="hidden lg:grid grid-cols-12 gap-4 p-4 border-b border-stone-100 bg-stone-50 text-xs font-bold tracking-wider text-stone-400 uppercase">
            <div className="col-span-4 pl-4">Word</div>
            <div className="col-span-5">Meaning</div>
            <div className="col-span-2">Weight</div>
            <div className="col-span-1 text-right pr-4">Actions</div>
          </div>
          <div className="divide-y divide-stone-100">
            {Object.values(favorites).sort((a, b) => b.weight - a.weight).map((word) => (
              <div key={word.word} className="flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-4 p-4 items-start lg:items-center hover:bg-stone-50 transition-colors">
                <div className="lg:col-span-4 w-full flex justify-between items-center overflow-hidden">
                  <span className="font-bold text-stone-900 text-lg truncate pr-2">{word.word}</span>
                  <div className="lg:hidden flex items-center gap-3 shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      word.weight > 0 ? 'bg-red-100 text-red-800' : 
                      word.weight < 0 ? 'bg-green-100 text-green-800' : 
                      'bg-stone-100 text-stone-800'
                    }`}>
                      W: {word.weight}
                    </span>
                    <button
                      onClick={() => removeFavorite(word.word)}
                      className="p-1.5 text-stone-400 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-5 text-stone-600 text-sm lg:text-base pr-4 line-clamp-2 lg:line-clamp-none">
                  {word.chineseMeaning}
                </div>
                <div className="hidden lg:block lg:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    word.weight > 0 ? 'bg-red-100 text-red-800' : 
                    word.weight < 0 ? 'bg-green-100 text-green-800' : 
                    'bg-stone-100 text-stone-800'
                  }`}>
                    {word.weight > 0 ? '+' : ''}{word.weight}
                  </span>
                </div>
                <div className="hidden lg:block lg:col-span-1 text-right pr-4">
                  <button
                    onClick={() => removeFavorite(word.word)}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentIndex >= deck.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Review Complete!</h2>
        <p className="text-stone-500 mb-8">You've gone through all your saved words.</p>
        <div className="flex gap-4">
          <button
            onClick={() => setFlashcardState({ isReviewing: false })}
            className="px-8 py-3 bg-white border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
          >
            Back to List
          </button>
          <button
            onClick={() => startReview(reviewLimit)}
            className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Review Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 lg:p-8 bg-stone-50 overflow-hidden">
      <div className="w-full flex justify-between items-center text-stone-500 font-medium z-10 shrink-0 mb-4 lg:mb-8">
        <button
          onClick={() => setFlashcardState({ isReviewing: false })}
          className="hover:text-stone-900 transition-colors flex items-center gap-2 text-sm lg:text-base"
        >
          <X className="w-4 h-4 lg:w-5 lg:h-5" /> Exit
        </button>
        <div className="flex items-center gap-2 lg:gap-4 text-xs lg:text-sm">
          <span>{currentIndex + 1} / {deck.length}</span>
          <span className="bg-stone-200 px-2 lg:px-3 py-0.5 lg:py-1 rounded-full text-stone-700">
            W: {currentWord.weight}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-min">
        <div className="relative w-full max-w-[320px] lg:max-w-[400px] h-[380px] lg:h-[440px] perspective-1000 z-0">
          <AnimatePresence mode="popLayout">
            <Flashcard
              key={currentWord.word}
              word={currentWord}
              isFlipped={isFlipped}
              setIsFlipped={(val: boolean) => setFlashcardState({ isFlipped: val })}
              onSwipe={handleSwipe}
              playAudio={playAudio}
            />
          </AnimatePresence>
        </div>

        <div className="mt-6 lg:mt-8 flex items-center gap-8 lg:gap-12 z-10 shrink-0">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleSwipe('left')}
              className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-red-100 text-red-500 flex items-center justify-center hover:bg-red-50 hover:scale-105 transition-all shadow-sm"
            >
              <X className="w-6 h-6 lg:w-8 lg:h-8" />
            </button>
            <span className="text-[10px] lg:text-sm font-medium text-stone-400 uppercase tracking-wider">Forgot</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleSwipe('right')}
              className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-green-100 text-green-500 flex items-center justify-center hover:bg-green-50 hover:scale-105 transition-all shadow-sm"
            >
              <Check className="w-6 h-6 lg:w-8 lg:h-8" />
            </button>
            <span className="text-[10px] lg:text-sm font-medium text-stone-400 uppercase tracking-wider">Know</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Flashcard({ word, isFlipped, setIsFlipped, onSwipe, playAudio }: any) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x > 80) {
      onSwipe('right');
    } else if (info.offset.x < -80) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, opacity }}
      animate={{ scale: 1, y: 0 }}
      initial={{ scale: 0.9, y: 50 }}
      exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center justify-center p-6 lg:p-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-stone-900 mb-4 lg:mb-6">{word.word}</h2>
          <p className="text-stone-400 text-[10px] lg:text-sm uppercase tracking-widest">Tap to flip</p>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-stone-100"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full p-5 lg:p-6 lg:p-8 flex flex-col">
            <div className="flex justify-between items-start mb-3 lg:mb-4 pb-3 lg:pb-4 border-b border-stone-100">
              <div className="pr-2">
                <h2 className="text-xl lg:text-2xl lg:text-3xl font-bold text-stone-900 mb-0.5 lg:mb-1 break-words">{word.word}</h2>
                <p className="text-sm lg:text-base lg:text-lg font-mono text-stone-500">{word.pronunciation}</p>
              </div>
              <button
                onClick={(e) => playAudio(e, word.word)}
                className="p-2 lg:p-2.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors shrink-0"
              >
                <Volume2 className="w-5 h-5 lg:w-5 lg:h-5 lg:w-6 lg:h-6" />
              </button>
            </div>

            <div className="space-y-3 lg:space-y-4 lg:space-y-6 flex-1 overflow-y-auto scrollbar-hide pb-2">
              <div>
                <h3 className="text-[9px] lg:text-[10px] font-black tracking-widest text-stone-400 uppercase mb-0.5 lg:mb-1">Chinese</h3>
                <p className="text-base lg:text-lg lg:text-xl text-stone-800 font-medium">{word.chineseMeaning}</p>
              </div>
              
              <div>
                <h3 className="text-[9px] lg:text-[10px] font-black tracking-widest text-stone-400 uppercase mb-0.5 lg:mb-1">Collocations</h3>
                <div className="flex flex-wrap gap-1.5 lg:gap-2">
                  {(word.collocations || []).slice(0, 3).map((col: string, idx: number) => (
                    <span key={idx} className="text-stone-600 text-[10px] lg:text-xs lg:text-sm bg-stone-50 px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-lg border border-stone-100">
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 lg:pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <Brain className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-indigo-500" />
                  <h3 className="text-[9px] lg:text-[10px] font-black tracking-widest text-stone-400 uppercase">Mnemonics</h3>
                </div>
                <p className="text-xs lg:text-sm lg:text-base text-stone-600 leading-relaxed">
                  {word.memoryAid || 'No mnemonic available. Try creating your own association!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
