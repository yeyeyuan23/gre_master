import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { useStore } from '../store/useStore';
import { RefreshCw, Check, X, Volume2, Play, Trash2 } from 'lucide-react';
import { SavedWord } from '../store/useStore';

export default function Flashcards() {
  const { favorites, updateWeight, removeFavorite } = useStore();
  const [deck, setDeck] = useState<SavedWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewLimit, setReviewLimit] = useState<number | 'all'>(20);

  // Initialize deck only when starting review
  const startReview = (limit: number | 'all') => {
    const words = Object.values(favorites);
    // Sort by weight descending (higher weight = needs more review)
    words.sort((a, b) => b.weight - a.weight);
    
    const limitedWords = limit === 'all' ? words : words.slice(0, limit);
    setDeck(limitedWords);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsReviewing(true);
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

    setIsFlipped(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const playAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    const audio = new Audio(`https://api.dictionaryapi.dev/media/pronunciations/en/${text.toLowerCase()}-us.mp3`);
    
    audio.play().catch(() => {
      // Fallback to speech synthesis if audio file not found
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    });
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
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-2">Saved Words</h1>
            <p className="text-stone-500 text-lg">You have {totalFavorites} words in your collection.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200">
              {[20, 50, 100, 'all'].map((val) => (
                <button
                  key={val}
                  onClick={() => setReviewLimit(val as any)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
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
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-sm"
            >
              <Play className="w-5 h-5" />
              Start Review
            </button>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-stone-100 bg-stone-50 text-xs font-bold tracking-wider text-stone-400 uppercase">
            <div className="col-span-3 pl-4">Word</div>
            <div className="col-span-4">Meaning</div>
            <div className="col-span-3">Weight</div>
            <div className="col-span-2 text-right pr-4">Actions</div>
          </div>
          <div className="divide-y divide-stone-100">
            {Object.values(favorites).sort((a, b) => b.weight - a.weight).map((word) => (
              <div key={word.word} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-stone-50 transition-colors">
                <div className="col-span-3 pl-4">
                  <span className="font-bold text-stone-900 text-lg">{word.word}</span>
                </div>
                <div className="col-span-4 text-stone-600 truncate pr-4">
                  {word.chineseMeaning}
                </div>
                <div className="col-span-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    word.weight > 0 ? 'bg-red-100 text-red-800' : 
                    word.weight < 0 ? 'bg-green-100 text-green-800' : 
                    'bg-stone-100 text-stone-800'
                  }`}>
                    {word.weight > 0 ? '+' : ''}{word.weight}
                  </span>
                </div>
                <div className="col-span-2 text-right pr-4">
                  <button
                    onClick={() => removeFavorite(word.word)}
                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from saved"
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
            onClick={() => setIsReviewing(false)}
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
    <div className="flex flex-col items-center justify-center h-full p-8 bg-stone-50 overflow-hidden relative">
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-stone-500 font-medium">
        <button
          onClick={() => setIsReviewing(false)}
          className="hover:text-stone-900 transition-colors flex items-center gap-2"
        >
          <X className="w-5 h-5" /> Exit Review
        </button>
        <div className="flex items-center gap-4">
          <span>Reviewing {currentIndex + 1} of {deck.length}</span>
          <span className="bg-stone-200 px-3 py-1 rounded-full text-sm">
            Weight: {currentWord.weight}
          </span>
        </div>
      </div>

      <div className="relative w-full max-w-md aspect-[3/4] perspective-1000">
        <AnimatePresence mode="popLayout">
          <Flashcard
            key={currentWord.word}
            word={currentWord}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            onSwipe={handleSwipe}
            playAudio={playAudio}
          />
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 rounded-full bg-white border-2 border-red-100 text-red-500 flex items-center justify-center hover:bg-red-50 hover:scale-105 transition-all shadow-sm"
          >
            <X className="w-8 h-8" />
          </button>
          <span className="text-sm font-medium text-stone-400 uppercase tracking-wider">Didn't Know</span>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 rounded-full bg-white border-2 border-green-100 text-green-500 flex items-center justify-center hover:bg-green-50 hover:scale-105 transition-all shadow-sm"
          >
            <Check className="w-8 h-8" />
          </button>
          <span className="text-sm font-medium text-stone-400 uppercase tracking-wider">Knew It</span>
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
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
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
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-5xl font-bold text-stone-900 mb-6">{word.word}</h2>
          <p className="text-stone-400 text-sm uppercase tracking-widest">Tap to flip</p>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border border-stone-100 p-8 overflow-y-auto"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex justify-between items-start mb-6 pb-6 border-b border-stone-100">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2">{word.word}</h2>
              <p className="text-lg font-mono text-stone-500">{word.pronunciation}</p>
            </div>
            <button
              onClick={(e) => playAudio(e, word.word)}
              className="p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold tracking-wider text-stone-400 uppercase mb-2">Chinese</h3>
              <p className="text-lg text-stone-800 font-medium">{word.chineseMeaning}</p>
            </div>
            
            <div>
              <h3 className="text-xs font-bold tracking-wider text-stone-400 uppercase mb-2">English</h3>
              <p className="text-stone-700 leading-relaxed">{word.englishMeaning}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-wider text-stone-400 uppercase mb-2">Collocations</h3>
              <ul className="space-y-1">
                {(word.collocations || []).slice(0, 3).map((col: string, idx: number) => (
                  <li key={idx} className="text-stone-600 text-sm bg-stone-50 px-2 py-1 rounded inline-block mr-2 mb-2">
                    {col}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
