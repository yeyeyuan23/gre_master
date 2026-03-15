import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import VocabularySearch from './pages/VocabularySearch';
import SentenceAnalyzer from './pages/SentenceAnalyzer';
import Flashcards from './pages/Flashcards';
import EssayGrader from './pages/EssayGrader';
import SavedEssays from './pages/SavedEssays';
import SavedSentences from './pages/SavedSentences';
import ApiKeyGuard from './components/ApiKeyGuard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<VocabularySearch />} />
          <Route path="analyze" element={<SentenceAnalyzer />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="essay" element={<EssayGrader />} />
          <Route path="saved-essays" element={<SavedEssays />} />
          <Route path="saved-sentences" element={<SavedSentences />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
