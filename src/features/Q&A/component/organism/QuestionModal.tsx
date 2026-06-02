import { IQuestionModalProps } from "../../types/props.types";

export  function QuestionModal({
  open,
  title,
  content,
  onClose,
  onChangeTitle,
  onChangeContent,
  onSubmit,
  isLoading,
  mode = "create", // default to "create"
}: IQuestionModalProps) {
  if (!open) return null;
///ida ja props open = true from (header -> page ) then the modal will be rendered and the user can interact with it
   return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white w-[500px] rounded-xl p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        
        <h2 className="text-xl font-bold mb-4 text-black">
          {mode === "edit" ? "Edit question" : "Ask a question"}  {/* ← يتغير */}
        </h2>

        <input
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Question title"
          className="w-full border rounded p-2 mb-3"
        />

        <textarea
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          placeholder="Describe your question"
          className="w-full border rounded p-2 min-h-[120px] mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} disabled={isLoading} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={title.trim().length < 5 || isLoading}
            className="bg-orange-500 disabled:opacity-40 text-white px-4 py-2 rounded"
          >
            {isLoading ? "Loading...." :mode === "edit" ? "Save changes" : "Publish"} 
          </button>
        </div>
      </div>
    </div>
  );
}