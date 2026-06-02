import { UserRole } from "@/features/user/types/user.types";

export interface QAAuthorModel {
  id: string;
  userName: string;
  role:UserRole
}

export interface AnswerModel {
  id: string;
  content: string;
  author: QAAuthorModel;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  UserProfile:{
    fullName:string
    profilePicture:string
  } | null
  RestaurantProfile:{
    fullName:string
    profilePicture:string
  } | null
}

export interface QuestionModel {
  id: string;
  title: string;
  content: string;
  User: QAAuthorModel;
  createdAt: string;
  likeCount: number;
  userId:string,
  answerCount: number;
  isLiked?: boolean;
  isPinned?: boolean;
  isSavedForLater?: boolean;
  isClosed?: boolean;
  isSolved?: boolean; 
  isAnsweredByMe?: boolean;
}
// export interface QuestionModel {
//   id: string;
//   title: string;
//   content: string;
//   User: QAAuthorModel;
//   createdAt: string;
//   likeCount: number;
//   userId:string,
//   answerCount: number;
//   isLiked?: boolean;
//   isPinned?: boolean;
//   isSavedForLater?: boolean;
//   isClosed?: boolean;
//   isSolved?: boolean; 
//   isAnsweredByMe?: boolean;
// }



export type QANavTab = 'all' | 'my-questions' | 'my-answers' | 'answer-later';