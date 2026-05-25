import { AnswerModel } from "../../type/qa.types";
import { AvatarAtom } from "../atoms/AvatarAtom";
import { AnswerInput } from "../molecules/AnswerInput";
import { Icon } from "../atoms/Icon";

interface AnswerListProps {
  questionId: string;
  answers: any[]; // 👈 any لأن الباك يرجع شكل مختلف
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
}: AnswerListProps) {
  return (
    <div className="mt-4 border-t border-[#F1D8CC] pt-4 flex flex-col gap-3">
      {answers.length === 0 ? (
        <p className="text-sm text-[#8B6F63] italic">
          No answers found. Be the first to answer!
        </p>
      ) : (
        answers.map((answer) => {
          // 👈 نستخرج البيانات بشكل مرن
          const rawAnswer = answer as any;
          const username = rawAnswer?.user?.UserProfile?.fullName || rawAnswer?.user?.userName || rawAnswer?.author?.username || "User";
          const avatarUrl = rawAnswer?.user?.UserProfile?.profilePicture || rawAnswer?.author?.avatarUrl || null;
          const content = rawAnswer?.text || rawAnswer?.content || "";
          const createdAt = rawAnswer?.createdAt || "";
          const likesCount = rawAnswer?.likesCount ?? rawAnswer?.likeCount ?? 0;
          const isLiked = rawAnswer?.isLiked ?? false;

          return (
            <div
              key={answer.id}
              className="flex gap-3 bg-[#FFF5F0] rounded-xl p-3 border border-[#F1D8CC]"
            >
              <AvatarAtom
                avatarUrl={avatarUrl}
                name={username}
                size="sm"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#3D2A22]">
                    {username}
                  </span>
                  <span className="text-xs text-[#8B6F63]">
                    {new Date(createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-sm text-[#2D1F1A] leading-relaxed">
                  {content}
                </p>
                <button
                  onClick={() => onLikeAnswer(questionId, answer.id)}
                  className={`mt-2 text-xs flex items-center gap-1 transition-colors ${
                    isLiked ? "text-orange-500" : "text-[#8B6F63] hover:text-orange-400"
                  }`}
                >
                  <Icon name="heart" size="sm" filled={isLiked} color={isLiked ? "orange" : "gray"} />
                  <span>{likesCount}</span>
                </button>
              </div>
            </div>
          );
        })
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