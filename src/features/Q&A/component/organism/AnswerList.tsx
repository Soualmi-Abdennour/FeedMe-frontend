import { AvatarAtom } from "../atoms/AvatarAtom";
import { AnswerInput } from "../molecules/AnswerInput";
import { useDeleteCommentMutation } from "@/features/Q&A/store/qa.api";
import { useAppSelector } from "@/store/base.store";
import { useMemo } from "react";

interface AnswerListProps {
  questionId: string;
  answers: any[];
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

  const token = useAppSelector(state => state.authentication.authentication?.jwtToken);
  const currentUserId = useMemo(() => {
    if (!token) return "";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload.userId || payload.sub || "";
    } catch { return ""; }
  }, [token]);

  const [deleteComment] = useDeleteCommentMutation();

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment({ questionId, commentId }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 border-t border-[#F1D8CC] pt-4 flex flex-col gap-3">
      {answers.length === 0 ? (
        <p className="text-sm text-[#8B6F63] italic">
          No answers found. Be the first to answer!
        </p>
      ) : (
        answers.map((answer) => {
          const rawAnswer = answer as any;
          const username = rawAnswer?.user?.UserProfile?.fullName || rawAnswer?.user?.userName || rawAnswer?.author?.username || "User";
          const avatarUrl = rawAnswer?.user?.UserProfile?.profilePicture || rawAnswer?.author?.avatarUrl || null;
          const content = rawAnswer?.text || rawAnswer?.content || "";
          const createdAt = rawAnswer?.createdAt || "";
          const commentUserId = rawAnswer?.userId || rawAnswer?.user?.id || "";
          const isOwner = commentUserId === currentUserId;

          return (
            <div
              key={answer.id}
              className="flex gap-3 bg-[#FFF5F0] rounded-xl p-3 border border-[#F1D8CC]"
            >
              <AvatarAtom avatarUrl={avatarUrl} name={username} size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#3D2A22]">{username}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8B6F63]">
                      {new Date(createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                    {isOwner && (
                      <button
                        onClick={() => handleDelete(answer.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-[#2D1F1A] leading-relaxed">{content}</p>
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