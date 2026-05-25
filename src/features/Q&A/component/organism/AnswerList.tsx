import { AnswerModel } from "../../type/qa.types";
import { AvatarAtom } from "../atoms/AvatarAtom";
import { AnswerInput } from "../molecules/AnswerInput";
import { Icon } from "../atoms/Icon";
interface AnswerListProps {
  questionId: string;
  answers: AnswerModel[];
  onSubmitAnswer: (questionId: string, text: string) => void;
  onLikeAnswer: (questionId: string, answerId: string) => void;
  isClosed?: boolean;
}

export function AnswerList({
  questionId,
  answers,
  onSubmitAnswer,
  onLikeAnswer,
  isClosed = false,
}: AnswerListProps
  ) {
  return (
    <div className="mt-4 border-t border-[#F1D8CC] pt-4 flex flex-col gap-3">
      {answers.length === 0 ? (
        <p className="text-sm text-[#8B6F63] italic">
          No answers found. Be the first to answer!
        </p>
      ) : (
        answers.map((answer) => (
          <div
            key={answer.id}
            className="flex gap-3 bg-[#FFF5F0] rounded-xl p-3 border border-[#F1D8CC]"
          >
            <AvatarAtom
              avatarUrl={answer.author.avatarUrl}
              name={answer.author.username}
              size={"sm"}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#3D2A22]">
                  {answer.author.username}
                </span>
                <span className="text-xs text-[#8B6F63]">
                  {new Date(answer.createdAt).toLocaleDateString("fr-FR")}
                </span>
              </div>
              <p className="text-sm text-[#2D1F1A] leading-relaxed">
                {answer.content}
              </p>
              <button
                onClick={() => onLikeAnswer(questionId, answer.id)}
                className={`mt-2 text-xs flex items-center gap-1 transition-colors ${
                  answer.isLiked
                    ? "text-orange-500"
                    : "text-[#8B6F63] hover:text-orange-400"
                }`}
              >
       <Icon
    name="heart"
    size="sm"
    filled={answer.isLiked}
    color={answer.isLiked ? "orange" : "gray"}
  />
  <span>{answer.likesCount}</span>
                </button>
            </div>
          </div>
        ))
      )}

      {isClosed && (
        <div className="rounded-xl border border-[#F1D8CC] bg-[#FFF5F0] p-3 text-sm text-[#8B6F63]">
          This question is closed. New answers are disabled.
        </div>
      )}
      <AnswerInput questionId={questionId} onSubmit={onSubmitAnswer} disabled={isClosed} />
    </div>
  );
}