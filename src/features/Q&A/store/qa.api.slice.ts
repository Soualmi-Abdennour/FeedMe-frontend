// src/features/Q&A/store/qa.api.ts

import { fetchAPI } from "@/store/base.store";
import { QuestionModel } from "../types/qa.types";
import { LikeResponse, QuestionAnswerResponse, QuestionAnswersResponse, QuestionResponse, QuestionsResponse, SaveResponse } from "@/types/api.types";

export const qaApiSlice = fetchAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestions: builder.query<{ data: { questions: QuestionModel[]; nextCursor: string | null } }, { limit: number; cursor: string | null }>({
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

    createQuestion: builder.mutation<QuestionResponse, { title: string; content: string }>({
      query: (newQuestion) => ({ url: "/questions", method: "POST", body: newQuestion }),
      invalidatesTags: ["Questions"],
    }),

    updateQuestion: builder.mutation<QuestionResponse, { id: string; title: string; content: string }>({
      query: ({ id, ...body }) => ({ url: `/questions/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Questions"],
    }),

    deleteQuestion: builder.mutation<QuestionResponse, string>({
      query: (id) => ({ url: `/questions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Questions"],
    }),

    toggleQuestionLike: builder.mutation<LikeResponse, string>({
      query: (id) => ({ url: `/questions/${id}/toggle-like`, method: "POST" }),
      invalidatesTags: ["Questions"],
    }),

    toggleQuestionPin: builder.mutation<QuestionResponse, string>({
      query: (id) => ({ url: `/questions/pin/${id}`, method: "PATCH" }),
      invalidatesTags: ["Questions"],
    }),

    toggleQuestionSave: builder.mutation<SaveResponse, string>({
      query: (questionId) => ({ url: `/questions/save/${questionId}`, method: "POST" }),
      invalidatesTags: ["Questions"],
    }),


    getQuestionAnswers: builder.query<QuestionAnswersResponse, string>({
      query: (questionId) => `/questions/${questionId}/answers`,
      providesTags: ["Questions"],
    }),

    createQuestionAnswer: builder.mutation<QuestionAnswerResponse, { questionId: string; text: string }>({
      query: ({ questionId, text }) => ({
        url: `/questions/${questionId}/answers`,
        method: "POST",
        body: { text }
      }),
      invalidatesTags: ["Questions"],
    }),

    markAsSolved: builder.mutation<QuestionResponse, string>({
      query: (id) => ({ url: `/questions/${id}/solve`, method: "PATCH" }),
      invalidatesTags: ["Questions"],
    }),

    closeQuestion: builder.mutation<QuestionResponse, string>({
      query: (id) => ({ url: `/questions/${id}/close`, method: "PATCH" }),
      invalidatesTags: ["Questions"],
    }),
    getMyAnsweredQuestions: builder.query<QuestionsResponse, void>({
      query: () => "/questions/my/answered",
      providesTags: ["Questions"],
    }),
    deleteQuestionAnswer: builder.mutation<QuestionAnswerResponse, { questionId: string; answerId: string }>({
      query: ({ questionId, answerId }) => ({
        url: `/questions/answers/${answerId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useCreateQuestionAnswerMutation,
  useGetMyQuestionsQuery,
  useGetSavedQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useToggleQuestionLikeMutation,
  useToggleQuestionPinMutation,
  useToggleQuestionSaveMutation,
  useDeleteQuestionAnswerMutation,
  useMarkAsSolvedMutation,
  useCloseQuestionMutation,
  useGetMyAnsweredQuestionsQuery,
  useGetQuestionAnswersQuery,

} = qaApiSlice;