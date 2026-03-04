import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import VocabularySearch from './pages/VocabularySearch';
import Flashcards from './pages/Flashcards';
import EssayGrader from './pages/EssayGrader';
import SavedEssays from './pages/SavedEssays';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<VocabularySearch />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="essay" element={<EssayGrader />} />
          <Route path="saved-essays" element={<SavedEssays />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
