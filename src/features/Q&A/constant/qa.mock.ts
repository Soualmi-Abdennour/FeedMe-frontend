import { QuestionModel, AnswerModel } from '../type/qa.types';

export const MOCK_QUESTIONS: QuestionModel[] = [
  {
    id: '1',
    title: 'Secret du Couscous',
    description: 'Comment réussir un Couscous parfaitement graine par graine ?',
    author: { id: 'u1', username: 'Messaoud', handle: '@messaoud', avatarUrl: null },
    createdAt: '2025-04-30',
    likesCount: 12,
    answersCount: 3,
    isLiked: false,
    isAnsweredByMe: true,
    isSavedForLater: false,
    isPinned: false,
    isSolved: false,
    isClosed: false,
  },
  {
    id: '2',
    title: 'Recette Chorba',
    description: 'Quelle est la meilleure recette de la chorba frik authentique ?',
    author: { id: 'u2', username: 'Ahmed', handle: '@ahmed', avatarUrl: null },
    createdAt: '2025-04-29',
    likesCount: 8,
    answersCount: 1,
    isLiked: false,
    isAnsweredByMe: false,
    isSavedForLater: false,
    isPinned: false,
    isSolved: false,
    isClosed: false,
  },
  {
    id: '3',
    title: 'Pâte Feuilletée Maison',
    description: 'Astuces pour réussir la pâte feuilletée maison comme un pro ?',
    author: { id: 'me', username: 'Sara', handle: '@sara', avatarUrl: null },
    createdAt: '2025-04-28',
    likesCount: 15,
    answersCount: 5,
    isLiked: false,
    isAnsweredByMe: false,
    isSavedForLater: false,
  },
];

export const MOCK_ANSWERS: Record<string, AnswerModel[]> = {
  '1': [
    {
      id: 'a1',
      content: 'Il faut bien aérer la semoule entre chaque cuisson !',
      author: { id: 'u3', username: 'Sara', handle: '@sara', avatarUrl: null },
      createdAt: '2025-04-30',
      likesCount: 4,
    },
     {
      id: 'a2',
      content: 'Il faut  entre chaque cuisson !',
      author: { id: 'u3', username: 'ahmmed', handle: '@ahmmed', avatarUrl: null },
      createdAt: '2025-04-30',
      likesCount: 4,
    },
     {
      id: 'a3',
      content: 'Il faut bien  !',
      author: { id: 'u3', username: 'wafaa', handle: '@wafaa', avatarUrl: null },
      createdAt: '2025-04-30',
      likesCount: 4,
    },
  ],
};
