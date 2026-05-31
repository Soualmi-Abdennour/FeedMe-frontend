import { IQuestionList } from '../../types/props.types';
import QuestionCard from '../molecules/QuestionCard';



export const QuestionList = ({
  questions, answersMap, currentUserId, activeTab,
    onSubmitAnswer, onLikeAnswer,
  onEdit, onPin, onMarkSolved, onCloseQuestion, onDelete,
}: IQuestionList) => (
  <div className="flex flex-col gap-4">
    {!questions || questions.length === 0 ? (
      <div className="text-center py-10 text-[#8B6F63]">No questions found.</div>
    ) : (
      questions.map((question) => {
        
        const authorId = question.userId ?? "";
        const displayName = question.User.userName ?? "User";

        const initials = displayName
          .split(" ")
          .map((n: string) => n[0] || "")
          .join("")
          .toUpperCase()
          .slice(0, 2);

        // ضبط حالة الحفظ للتبويب الحالي
        const isQuestionSaved = activeTab === "answer-later" ? true : (question?.isSavedForLater ?? false);

        return (
          <QuestionCard
            key={question.id}
            questionId={question.id}
            authorId={authorId}
            currentUserId={currentUserId}
            activeTab={activeTab}
            title={question.title ?? "No Title"}
            // الاعتماد المباشر على حقل content القادم من السيرفر
            description={question.content ?? ""} 
            username={displayName}
            userInitials={initials}
            userBg=""
            date={question.createdAt}
            // مطابقة دقيقة لحقول الـ Counts القادمة من الباك إند
            likes={question.likeCount ?? 0}
            answersCount={question.commentCount ?? 0}
            isLiked={question.isLiked ?? false}
            isSaved={isQuestionSaved} 
            isPinned={question.isPinned ?? false}
            isSolved={question.isSolved ?? false} 
            isClosed={question.isClosed ?? false} 
            answers={answersMap[question.id] ?? []}
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