import { Routes, Route } from 'react-router-dom';

import QuizList from './components/quiz/QuizList';
import QuizDetail from './components/quiz/QuizDetail';

function App() {
  return (
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
      </Routes>
  );
}

export default App;
