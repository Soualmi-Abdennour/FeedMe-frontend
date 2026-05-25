import { useState } from "react";

interface AnswerInputProps {
  questionId: string;
  onSubmit: (questionId: string, text: string) => void; //"غادي تناديها ملي تبعث الجواب
  disabled?: boolean;
  placeholder?: string;
}

export function AnswerInput({
  questionId,
  onSubmit,
  disabled = false,
  placeholder = "Write your answer...",
}: AnswerInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onSubmit(questionId, text.trim());
    setText("");
  };

return (
    <div className="flex flex-col gap-2 pt-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={disabled ? "This question is closed." : placeholder}
        rows={3}
        disabled={disabled}
        className="w-full border border-[#F1D8CC] rounded-xl px-4 py-3 text-sm resize-none bg-[#FFF5F0] focus:outline-none focus:ring-2 focus:ring-orange-200 text-[#2D1F1A] placeholder:text-[#8B6F63]"
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={disabled || text.trim().length < 3}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors"
        >
          Publish answer
        </button>
      </div>
    </div>
  );
}