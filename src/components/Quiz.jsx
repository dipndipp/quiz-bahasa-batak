import { useState } from "react";

function Quiz({ data }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = data[index];

  const handleSelect = (opt) => {
    if (selected !== null) return;

    setSelected(opt);

    const correct =
      current.type === "number"
        ? Number(current.answer)
        : current.type === "boolean"
        ? current.answer === true || current.answer === "Benar"
        : current.answer;

    const chosen =
      current.type === "number"
        ? Number(opt)
        : current.type === "boolean"
        ? opt === "Benar"
        : opt;

    if (chosen === correct) setScore((prev) => prev + 1);
  };

  const next = () => {
    if (index + 1 < data.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center animate-fadeIn">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">🎉 Kuis Selesai!</h2>
        <p className="text-xl font-semibold text-gray-700 mb-2">Skor Kamu:</p>
        <p className="text-5xl font-extrabold text-green-500">{score} / {data.length}</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="text-sm text-gray-500 mb-2">Soal {index + 1} dari {data.length}</div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">{current.question}</h3>

      <div className="grid gap-4">
        {current.options.map((opt, i) => {
          const isCorrect = selected !== null && opt.toString() === current.answer.toString();
          const isSelected = selected === opt;

          let classes = "px-5 py-3 rounded-xl transition-all text-left border shadow hover:scale-[1.02] ";

          if (selected === null) {
            classes += "bg-white border-gray-300 hover:bg-blue-100";
          } else if (isCorrect) {
            classes += "bg-green-200 border-green-600";
          } else if (isSelected) {
            classes += "bg-red-200 border-red-600";
          } else {
            classes += "bg-gray-100 border-gray-200";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              className={classes}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <>
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 font-medium mb-1">💡 Penjelasan:</p>
            <p className="text-sm text-gray-600 italic">{current.comment}</p>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={next}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg shadow-md font-semibold transition-all duration-300"
            >
              Soal Selanjutnya →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;