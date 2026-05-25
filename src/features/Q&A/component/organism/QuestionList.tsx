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
        // لتجاوز قيود الأنواع الصارمة بشكل آمن أثناء قراءة العلاقات المتداخلة
        const rawQ = q as any;

        const authorId = rawQ?.User?.id || rawQ?.author?.id || q?.userId || rawQ?.UserId || "";
        const displayName = rawQ?.User?.UserProfile?.fullName || rawQ?.User?.userName || rawQ?.author?.username || "User";

        const initials = displayName
          .split(" ")
          .map((n: string) => n[0] || "")
          .join("")
          .toUpperCase()
          .slice(0, 2);

        // ضبط حالة الحفظ للتبويب الحالي
        const isQuestionSaved = activeTab === "answer-later" ? true : (q?.isSavedForLater ?? false);

        return (
          <QuestionCard
            key={q?.id}
            questionId={q?.id}
            authorId={authorId}
            currentUserId={currentUserId}
            activeTab={activeTab}
            title={q?.title || "No Title"}
            // الاعتماد المباشر على حقل content القادم من السيرفر
            description={rawQ?.content || q?.description || ""} 
            username={displayName}
            userInitials={initials}
            userBg=""
            date={q?.createdAt}
            // مطابقة دقيقة لحقول الـ Counts القادمة من الباك إند
            likes={rawQ?.likeCount ?? 0}
            answersCount={rawQ?.commentCount ?? 0}
            isLiked={q?.isLiked ?? false}
            isSaved={isQuestionSaved} 
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