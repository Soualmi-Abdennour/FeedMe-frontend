// src/features/Q&A/store/qa.api.ts

import { fetchAPI } from "@/store/base.store";
import { QuestionModel } from "../types/qa.types";
import { LikeResponse, QuestionCommentsResponse, QuestionsResponse, SaveResponse } from "@/types/api.types";

export const qaApiSlice = fetchAPI.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<{ data: { questions: QuestionModel[]; nextCursor: string | null } }, { limit: number; cursor: string | null }>({
      query: ({ limit, cursor }) => `/questions?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`,
      providesTags: ["Questions"],
    }),

    getMyQuestions: builder.query<QuestionsResponse, void>({
      query: () => "/questions/my",
      providesTags: ["Questions"],
    }),

    getSavedQuestions: builder.query<QuestionsResponse, void>({
      query: () => "/questions/saved",
      providesTags: ["Questions"],
    }),

    createQuestion: builder.mutation<void, { title: string; content: string }>({
      query: (newQuestion) => ({ url: "/questions", method: "POST", body: newQuestion }),
      invalidatesTags: ["Questions"],
    }),

    updateQuestion: builder.mutation<void, { id: string; title: string; content: string }>({
      query: ({ id, ...body }) => ({ url: `/questions/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Questions"],
    }),

    deleteQuestion: builder.mutation<void, string>({
      query: (id) => ({ url: `/questions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Questions"],
    }),

    toggleLike: builder.mutation<LikeResponse, string>({
      query: (id) => ({ url: `/questions/${id}/toggle-like`, method: "POST" }),
      invalidatesTags: ["Questions"],
    }),

    togglePin: builder.mutation<void, string>({
      query: (id) => ({ url: `/questions/pin/${id}`, method: "PATCH" }),
      invalidatesTags: ["Questions"],
    }),

    toggleSaveQuestion: builder.mutation<SaveResponse, string>({
      query: (questionId) => ({ url: `/questions/save/${questionId}`, method: "POST" }),
      invalidatesTags: ["Questions"],
    }),

    // unsaveQuestion: builder.mutation<void, string>({
    //   query: (questionId) => ({ url: `/questions/save/${questionId}`, method: "DELETE" }),
    //   invalidatesTags: ["Questions"],
    // }),

    getQuestionComments: builder.query<QuestionCommentsResponse, string>({
      query: (questionId) => `/questions/${questionId}/comments`,
      providesTags: ["Questions"],
    }),

    createComment: builder.mutation<void, { questionId: string; text: string }>({
      query: ({ questionId, text }) => ({
        url: `/questions/${questionId}/comments`,
        method: "POST",
        body: { text }
      }),
      invalidatesTags: ["Questions"],
    }),

    markAsSolved: builder.mutation<void, string>({
      query: (id) => ({ url: `/questions/${id}/solve`, method: "PATCH" }),
      invalidatesTags: ["Questions"],
    }),

    closeQuestion: builder.mutation<void, string>({
      query: (id) => ({ url: `/questions/${id}/close`, method: "PATCH" }),
      invalidatesTags: ["Questions"],
    }),
    getMyAnsweredQuestions: builder.query<QuestionsResponse, void>({
      query: () => "/questions/my/answered",
      providesTags: ["Questions"],
    }),
    deleteComment: builder.mutation<void, { questionId: string; commentId: string }>({
      query: ({ questionId, commentId }) => ({
        url: `/questions/comments/${commentId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionCommentsQuery,
  useGetMyQuestionsQuery,
  useGetSavedQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useToggleLikeMutation,
  useTogglePinMutation,
  useToggleSaveQuestionMutation,
  // useSaveQuestionMutation,
  // useUnsaveQuestionMutation,
  useCreateCommentMutation,
  useMarkAsSolvedMutation,
  useCloseQuestionMutation,
  useGetMyAnsweredQuestionsQuery,
  useDeleteCommentMutation,

} = qaApiSlice;