import { useGetQuestionCommentsQuery } from "@/features/Q&A/store/qa.api.slice"; // 👈 إضافة
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import Text from "../atoms/ActionBarText";
import { AnswerList } from "../organism/AnswerList";
import ActionBar from "./ActionBar";
import QuestionMenu from "./QuestionMenu";
import UserHeader from "./UserHeader";
import { IQuestionCardProps } from "../../types/props.types";


export default function QuestionCard({
  title, description, username, userInitials, userBg, date,
  likes, answersCount, isLiked = false, isSaved = false,
  isPinned = false, isSolved = false, isClosed = false,
  questionId, authorId, currentUserId, activeTab,
  answers, onLike, onReply,
  onSubmitAnswer, onLikeAnswer,
  onEdit, onPin, onMarkSolved, onClose, onDelete,
}: IQuestionCardProps) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isOwner = authorId === currentUserId;

  // 👈 جلب الكومنتات عند الضغط على View answers فقط
  const { data: commentsData } = useGetQuestionCommentsQuery(questionId, {
    skip: !showAnswers
  });

  const fetchedAnswers = commentsData?.data?.comments ?? [];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/qa/${questionId}`);
    setMenuOpen(false);
  };

  return (
    <div className="bg-white border border-[#F1D8CC] rounded-2xl p-5 relative">

      <div className="flex items-start justify-between">
        <UserHeader
          username={username}
          initials={userInitials}
          backgroundColor={userBg}
          date={date}
        />

        <div className="flex items-center gap-2 shrink-0">
          {isPinned && (
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-medium">
              Pinned
            </span>
          )}
          {isSolved && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
              Solved
            </span>
          )}
          {isClosed && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
              Closed
            </span>
          )}

          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen((p) => !p); }}
              className="p-1.5 rounded-lg text-[#8B6F63] hover:text-[#3D2A22] hover:bg-[#FFF5F0] transition-colors"
            >
              <MoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <QuestionMenu
                isOwner={isOwner}
                isInMyQuestions={activeTab === "my-questions"}
                hasAnswers={answersCount > 0}
                isPinned={isPinned}
                isSolved={isSolved}
                isClosed={isClosed}
                onEdit={() => { onEdit(questionId); setMenuOpen(false); }}
                onPin={() => { onPin(questionId); setMenuOpen(false); }}
                onMarkSolved={() => { onMarkSolved(questionId); setMenuOpen(false); }}
                onClose={() => { onClose(questionId); setMenuOpen(false); }}
                onDelete={() => { onDelete(questionId); setMenuOpen(false); }}
                onViewProfile={() => { console.log("view profile", authorId); setMenuOpen(false); }}
                onCopyLink={handleCopyLink}
                onDismiss={() => setMenuOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Text variant="h3" className="font-bold text-[#3D2A22]">{title}</Text>
        <Text variant="body" className="mt-2 text-[#6F564B]">{description}</Text>
      </div>

      <ActionBar
        likes={likes}
        comments={answersCount}
        isLiked={isLiked}
        isSaved={isSaved}
        onLike={onLike}
        onReply={onReply}
        onComment={() => setShowAnswers((p) => !p)}
      />

      {showAnswers && (
        <AnswerList
          questionId={questionId}
          answers={fetchedAnswers} // 👈 بدل answers
          onSubmitAnswer={isClosed ? () => {} : onSubmitAnswer}
          onLikeAnswer={onLikeAnswer}
          isClosed={isClosed}
        />
      )}
    </div>
  );
}