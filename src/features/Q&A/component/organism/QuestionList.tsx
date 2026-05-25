import { AnswerModel, QuestionModel } from '../../type/qa.types';
import QuestionCard from '../molecules/QuestionCard';

interface Props {
  questions: QuestionModel[];
  answersMap: Record<string, AnswerModel[]>;
  currentUserId: string;
  activeTab: string;
  onLike: (id: string) => void;
  onSaveLater: (id: string) => void;
  onSubmitAnswer: (questionId: string, text: string) => void;
  onLikeAnswer: (questionId: string, answerId: string) => void;
  onEdit: (id: string) => void;
  onPin: (id: string) => void;
  onMarkSolved: (id: string) => void;
  onCloseQuestion: (id: string) => void;
  onDelete: (id: string) => void;
}

export const QuestionList = ({
  questions, answersMap, currentUserId, activeTab,
  onLike, onSaveLater, onSubmitAnswer, onLikeAnswer,
  onEdit, onPin, onMarkSolved, onCloseQuestion, onDelete,
}: Props) => (
  <div className="flex flex-col gap-4">
    {!questions || questions.length === 0 ? (
      <div className="text-center py-10 text-[#8B6F63]">No questions found.</div>
    ) : (
      questions.map((q) => {
        // 🔍 طباعة السؤال في الـ Console لمعاينته بالمتصفح وقراءة الحقول الحقيقية

        // حماية قصوى ومؤقتة لاستخراج البيانات مهما كان هيكلها لمنع التجمد الشاشة الحمراء
        const authorId = q?.User?.id || (q as any)?.author?.id || q?.userId || (q as any)?.UserId || "";
        const displayName = q?.User?.UserProfile?.fullName || q?.User?.userName || (q as any)?.author?.username || "User";

        const initials = displayName
          .split(" ")
          .map((n: string) => n[0] || "")
          .join("")
          .toUpperCase()
          .slice(0, 2);

        return (
          <QuestionCard
            key={q?.id}
            questionId={q?.id}
            authorId={authorId}
            currentUserId={currentUserId}
            activeTab={activeTab}
            title={q?.title || "No Title"}
            description={(q as any)?.content || q?.description || q?.title || ""} 
            username={displayName}
            userInitials={initials}
            userBg=""
            date={q?.createdAt}
            likes={(q as any)?.likeCount ?? q?.likesCount ?? 0}
            answersCount={(q as any)?.commentCount ?? q?.answersCount ?? 0}
            isLiked={q?.isLiked ?? false}
            isSaved={q?.isSavedForLater ?? false}
            isPinned={q?.isPinned ?? false}
            isSolved={q?.isSolved ?? false} 
            isClosed={q?.isClosed ?? false} 
            answers={answersMap[q?.id] ?? []}
            onLike={() => onLike(q?.id)}
            onReply={() => onSaveLater(q?.id)}
            onSubmitAnswer={onSubmitAnswer}
            onLikeAnswer={onLikeAnswer}
            onEdit={onEdit}
            onPin={onPin}
            onMarkSolved={onMarkSolved}
            onClose={onCloseQuestion}
            onDelete={onDelete}
          />
        );
      })
    )}
  </div>
);