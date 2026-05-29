import { AnswerModel, QuestionModel } from "./qa.types";

export interface IActionBarTextProps {
    children: React.ReactNode;
    variant?: "h1" | "h2" | "h3" | "body" | "small" | "caption";
    color?: "primary" | "secondary" | "muted";
    className?: string;
}

export interface IAnswerInputProps {
    questionId: string;
    onSubmit: (questionId: string, text: string) => void; //"غادي تناديها ملي تبعث الجواب
    disabled?: boolean;
    placeholder?: string;
}
export interface IQuestionCardProps {
  title: string;
  description: string;
  username: string;
  userInitials: string;
  userBg: string;
  date: string;
  likes: number;
  answersCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  isPinned?: boolean;
  isSolved?: boolean;
  isClosed?: boolean;
  questionId: string;
  authorId: string;
  currentUserId: string;
  activeTab: string;
  answers: AnswerModel[];
  onLike?: () => void;
  onReply?: () => void;
  onSubmitAnswer: (questionId: string, text: string) => void;
  onLikeAnswer: (questionId: string, answerId: string) => void;
  onEdit: (id: string) => void;
  onPin: (id: string) => void;
  onMarkSolved: (id: string) => void;
  onClose: (id: string) => void;
  onDelete: (id: string) => void;
}


export interface IQuestionMenuProps {
    isOwner: boolean;
    isInMyQuestions: boolean; //tji true from qstcard : isInMyQuestions={activeTab === "my-questions"}
    hasAnswers: boolean;
    isPinned: boolean;
    isSolved: boolean;
    isClosed: boolean;
    onEdit: () => void;
    onPin: () => void;
    onMarkSolved: () => void;
    onClose: () => void;
    onDelete: () => void;
    onViewProfile: () => void;
    onCopyLink: () => void;
    onDismiss: () => void;
}

export interface IMenuItemProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    danger?: boolean;
    disabled?: boolean;
    hint?: string;
}

export interface ISearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: () => void;
}
export interface IUserHeaderProps {
    username: string;
    initials: string;
    backgroundColor: string;
    date: string;
    handle?: string;
}

export interface IAnswerListProps {
  questionId: string;
  answers: any[];
  onSubmitAnswer: (questionId: string, text: string) => void;
  onLikeAnswer: (questionId: string, answerId: string) => void;
  isClosed?: boolean;
}

export interface IHeaderProps {
    onSearch?: (query: string) => void;
    onAskQuestion: () => void;
    searchValue?: string;
}

export interface IQuestionList {
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

export interface IQuestionModalProps {
    open: boolean;
    title: string;
    content: string;
    onClose: () => void;
    mode?: "create" | "edit";   // ← جديد
    onChangeTitle: (value: string) => void;
    onChangeContent: (value: string) => void;
    onSubmit: () => void;
}

type QATab = 'all' | 'my-questions' | 'my-answers' | 'answer-later';
export interface ISidebarProps {
    activeTab: QATab;
    onQuestionsClick?: () => void;
    onMyQuestionsClick?: () => void;
    onAnswersClick?: () => void;
    onRecentClick?: () => void;
}

