export interface QAAuthorModel {
  id: string;
  username: string;
  handle: string;
  avatarUrl: string | null;
}

export interface AnswerModel {
  id: string;
  content: string;
  author: QAAuthorModel;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface QuestionModel {
  id: string;
  title: string;
  description?: string;
  author: QAAuthorModel;
  createdAt: string;
  likesCount: number;
  answersCount: number;
  isLiked?: boolean;
  isPinned?: boolean;
  isSavedForLater?: boolean;
  isClosed?: boolean;
  isSolved?: boolean; // Optional flag to indicate if the question is solved
  isAnsweredByMe?: boolean;
  
 
}


export type QANavTab = 'all' | 'my-questions' | 'my-answers' | 'answer-later';