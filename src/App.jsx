import Quiz from "./components/Quiz";
import quizData from "../public/quizData.json";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">🎮 Kuis Interaktif</h1>
        <Quiz data={quizData} />
      </div>
    </div>
  );
}

export default App;