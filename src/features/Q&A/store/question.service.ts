import { apiFetch } from "./api";

// QUESTIONS
export const getAllQuestions = () =>
  apiFetch("/questions");

export const createQuestion = (data: any) =>
  apiFetch("/questions", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getMyQuestions = () =>
  apiFetch("/questions/my");

export const getOneQuestion = (id: string) =>
  apiFetch(`/questions/${id}`);

export const updateQuestion = (
  id: string,
  data: any
) =>
  apiFetch(`/questions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteQuestion = (id: string) =>
  apiFetch(`/questions/${id}`, {
    method: "DELETE",
  });

export const togglePin = (id: string) =>
  apiFetch(`/questions/pin/${id}`);

// LIKES
export const toggleLike = (
  questionId: string
) =>
  apiFetch(
    `/questions/${questionId}/toggle-like`,
    {
      method: "POST",
    }
  );

// SAVED
export const saveQuestion = (
  questionId: string
) =>
  apiFetch(`/questions/save/${questionId}`, {
    method: "POST",
  });

export const unsaveQuestion = (
  questionId: string
) =>
  apiFetch(`/questions/save/${questionId}`, {
    method: "DELETE",
  });

export const getSavedQuestions = () =>
  apiFetch("/questions/saved");

// COMMENTS
export const getComments = (
  questionId: string
) =>
  apiFetch(
    `/questions/${questionId}/comments`
  );

export const createComment = (
  questionId: string,
  data: any
) =>
  apiFetch(
    `/questions/${questionId}/comments`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

export const deleteComment = (
  id: string
) =>
  apiFetch(`/questions/comments/${id}`, {
    method: "DELETE",
  });

export const getMyComments = () =>
  apiFetch("/questions/my/comments");