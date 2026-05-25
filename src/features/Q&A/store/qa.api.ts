import { fetchAPI } from "../../../store/base.store"; // أو حسب اسم ملف الـ store الرئيسي عندك (مثلاً base.store.ts الظاهر في التبويب فوق)import { QuestionModel, AnswerModel, QuestionsResponse } from "@/type/qa.types";

export const qaApi = fetchAPI.injectEndpoints({
  endpoints: (builder) => ({

    // ── QUESTIONS ──────────────────────────────
    getQuestions: builder.query<QuestionsResponse, { limit?: number; cursor?: string | null } | void>({
      query: (params) => ({
        url: "/questions",
        params: {
          limit: params?.limit || 20,
          ...(params?.cursor && { cursor: params.cursor }),
        },
      }),
      providesTags: ["Questions"],
    }),

    getMyQuestions: builder.query<QuestionModel[], void>({
      query: () => "/questions/my",
      providesTags: ["Questions"],
    }),

    getSavedQuestions: builder.query<QuestionModel[], void>({
      query: () => "/questions/saved",
      providesTags: ["Questions"],
    }),

    createQuestion: builder.mutation<QuestionModel, { title: string; content: string }>({
      query: (body) => ({ url: "/questions", method: "POST", body }), // الباك إند يستقبل content بدل description
      invalidatesTags: ["Questions"],
    }),

    updateQuestion: builder.mutation<QuestionModel, { id: string; title: string; content: string }>({
      query: ({ id, ...body }) => ({ url: `/questions/${id}`, method: "PATCH", body }), // الباك إند يستقبل content بدل description
      invalidatesTags: ["Questions"],
    }),

    deleteQuestion: builder.mutation<void, string>({
      query: (id) => ({ url: `/questions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Questions"],
    }),

    toggleLike: builder.mutation<void, string>({
      query: (questionId) => ({ url: `/questions/${questionId}/toggle-like`, method: "POST" }),
      invalidatesTags: ["Questions"],
    }),

    togglePin: builder.mutation<void, string>({
      query: (id) => ({ url: `/questions/pin/${id}`, method: "GET" }),
      invalidatesTags: ["Questions"],
    }),

    saveQuestion: builder.mutation<void, string>({
      query: (questionId) => ({ url: `/questions/save/${questionId}`, method: "POST" }),
      invalidatesTags: ["Questions"],
    }),

    unsaveQuestion: builder.mutation<void, string>({
      query: (questionId) => ({ url: `/questions/save/${questionId}`, method: "DELETE" }),
      invalidatesTags: ["Questions"],
    }),

    // ── ANSWERS / COMMENTS ──────────────────────
    getAnswers: builder.query<AnswerModel[], string>({
      query: (questionId) => `/questions/${questionId}/comments`,
      providesTags: ["Answers"],
    }),

    createAnswer: builder.mutation<AnswerModel, { questionId: string; text: string }>({
      query: ({ questionId, text }) => ({
        url: `/questions/${questionId}/comments`,
        method: "POST",
        body: { text }, // الباك إند يستقبل text بدل content
      }),
      invalidatesTags: ["Answers", "Questions"],
    }),

    deleteAnswer: builder.mutation<void, string>({
      query: (id) => ({ 
        url: `/questions/comments/${id}`, // تم تصحيح المسار ليطابق deleteQuestionComment في الباك إند
        method: "DELETE" 
      }),
      invalidatesTags: ["Answers"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetMyQuestionsQuery,
  useGetSavedQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useToggleLikeMutation,
  useTogglePinMutation,
  useSaveQuestionMutation,
  useUnsaveQuestionMutation,
  useGetAnswersQuery,
  useCreateAnswerMutation,
  useDeleteAnswerMutation,
} = qaApi;