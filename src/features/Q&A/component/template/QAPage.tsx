'use client';

import { useState, useMemo } from "react";

// ORGANISMS
import {QAPageHeader} from "../organism/QAPageHeader";
import {QASidebar} from "../organism/QASidebar";
import { QuestionList } from "../organism/QuestionList";
import {QuestionModal} from "../organism/QuestionModal";

// TYPES & RTK QUERY HOOKS
import { QANavTab, QuestionModel } from "../../types/qa.types";
import { useAppSelector } from "@/store/base.store";
import {
  useGetQuestionsQuery,
  useGetMyQuestionsQuery,
  useGetSavedQuestionsQuery,
  useGetMyAnsweredQuestionsQuery, // 👈 إضافة
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useToggleLikeMutation,
  useTogglePinMutation,
  useSaveQuestionMutation,
  useUnsaveQuestionMutation,
  useCreateCommentMutation,
  useMarkAsSolvedMutation,
  useCloseQuestionMutation,
} from "@/features/Q&A/store/qa.api.slice";

export default function QAPage() {
  // ================= STATE =================
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<QANavTab>("all");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [successToastVisible, setSuccessToastVisible] = useState(false);

  const token = useAppSelector(state => state.authentication.authentication?.jwtToken);
  const currentUserId = useMemo(() => {
    if (!token) return "";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload.userId || payload.sub || "";
    } catch {
      return "";
    }
  }, [token]);

  // ================= RTK QUERY HOOKS =================
  const { data: allResponseData, isLoading: isAllLoading } = useGetQuestionsQuery({
    limit: 20,
    cursor: currentCursor,
  }, { skip: activeTab === "my-questions" || activeTab === "answer-later" || activeTab === "my-answers" });

  const { data: myResponseData, isLoading: isMyLoading } = useGetMyQuestionsQuery(undefined, {
    skip: activeTab !== "my-questions"
  });

  const { data: savedResponseData, isLoading: isSavedLoading } = useGetSavedQuestionsQuery(undefined, {
    skip: activeTab !== "answer-later"
  });

  // 👈 إضافة
  const { data: answeredResponseData, isLoading: isAnsweredLoading } = useGetMyAnsweredQuestionsQuery(undefined, {
    skip: activeTab !== "my-answers"
  });

  const [createQuestion] = useCreateQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [toggleLike] = useToggleLikeMutation();
  const [togglePin] = useTogglePinMutation();
  const [saveQuestion] = useSaveQuestionMutation();
  const [unsaveQuestion] = useUnsaveQuestionMutation();
  const [createComment] = useCreateCommentMutation();
  const [markAsSolved] = useMarkAsSolvedMutation();
  const [closeQuestion] = useCloseQuestionMutation();

  // ================= SELECT LIST BASED ON TAB =================
  const questionsList: QuestionModel[] = useMemo(() => {
    if (activeTab === "my-questions") {
      return myResponseData?.data?.questions || [];
    }
    if (activeTab === "answer-later") {
      return savedResponseData?.data?.questions || [];
    }
    if (activeTab === "my-answers") { // 👈 إضافة
      return answeredResponseData?.data?.questions || [];
    }
    return allResponseData?.data?.questions || [];
  }, [activeTab, allResponseData, myResponseData, savedResponseData, answeredResponseData]);

  const isLoading = 
    activeTab === "my-questions" ? isMyLoading : 
    activeTab === "answer-later" ? isSavedLoading :
    activeTab === "my-answers" ? isAnsweredLoading : // 👈 إضافة
    isAllLoading;

  const nextCursor = (activeTab === "my-questions" || activeTab === "answer-later" || activeTab === "my-answers") ? null : (allResponseData?.data?.nextCursor || null);

  // ================= FILTER & SEARCH =================
  const filtered = useMemo(() => {
    let list = questionsList;

    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        q =>
          q.title.toLowerCase().includes(s) ||
          (q as any).content?.toLowerCase().includes(s) ||
          q.description?.toLowerCase().includes(s)
      );
    }

    return list;
  }, [questionsList, search]);

  const pinnedQuestions = useMemo(() => filtered.filter(q => q.isPinned), [filtered]);
  const unpinnedQuestions = useMemo(() => filtered.filter(q => !q.isPinned), [filtered]);

  // ================= ACTIONS =================
  const handleEdit = (questionId: string) => {
    const q = questionsList.find((q) => q.id === questionId);
    if (!q) return;
    setEditingQuestionId(questionId);   
    setNewTitle(q.title);              
    setNewContent((q as any).content || q.description || ""); 
    setIsModalOpen(true);              
  };

  const handleCreateQuestion = async () => {
    if (newTitle.trim().length < 5) return;
    try {
      if (editingQuestionId) {
        await updateQuestion({ id: editingQuestionId, title: newTitle, content: newContent }).unwrap();
        setEditingQuestionId(null);
      } else {
        await createQuestion({ title: newTitle, content: newContent }).unwrap();
      }
      setNewTitle("");
      setNewContent("");
      setIsModalOpen(false);
      setSuccessToastVisible(true);
      window.setTimeout(() => setSuccessToastVisible(false), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (questionId: string) => {
    try {
      await deleteQuestion(questionId).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (id: string) => {
    try {
      await toggleLike(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePin = async (id: string) => {
    try {
      await togglePin(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveLater = async (id: string) => {
    const question = questionsList.find(q => q.id === id);
    try {
      if (activeTab === "answer-later" || question?.isSavedForLater) {
        await unsaveQuestion(id).unwrap();
      } else {
        await saveQuestion(id).unwrap();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitAnswer = async (questionId: string, text: string) => {
    if (text.length < 3) return;
    try {
      await createComment({ questionId, text }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkSolved = async (id: string) => {
    try {
      await markAsSolved(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseQuestion = async (id: string) => {
    try {
      await closeQuestion(id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF5F0] flex text-[#2D1F1A]">
      <div className="w-[260px] bg-white border-l border-[#F1D8CC] shadow-sm">
        <QASidebar
          activeTab={activeTab}
          onQuestionsClick={() => { setActiveTab("all"); setCurrentCursor(null); }}
          onMyQuestionsClick={() => setActiveTab("my-questions")}
          onAnswersClick={() => setActiveTab("my-answers")}
          onRecentClick={() => setActiveTab("answer-later")}
        />
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="border-b border-[#F1D8CC] bg-white shadow-sm">
          <QAPageHeader
            searchValue={search}
            onSearch={setSearch}
            onAskQuestion={() => setIsModalOpen(true)}
          />
        </div>

        <div className="px-6 md:px-10 py-8 flex justify-center">
          <div className="w-full max-w-5xl space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#3D2A22]">Q&A: Ask your questions</h1>
              <p className="text-sm text-[#8B6F63] mt-2">
                Share your cooking questions and get help from the community.
              </p>
            </div>

            <div className="space-y-6">
              {isLoading && questionsList.length === 0 ? (
                <div className="text-center py-10 text-[#8B6F63]">Loading questions...</div>
              ) : activeTab === "my-questions" ? (
                <>
                  {pinnedQuestions.length > 0 && (
                    <div className="bg-white rounded-2xl border border-orange-200 shadow-md p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-orange-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>
                          </svg>
                        </span>
                        <h2 className="text-base font-semibold text-orange-700">Pinned questions</h2>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{pinnedQuestions.length}</span>
                      </div>
                      <QuestionList
                        questions={pinnedQuestions}
                        answersMap={{}}
                        currentUserId={currentUserId}
                        activeTab={activeTab}
                        onLike={handleLike}
                        onSaveLater={handleSaveLater}
                        onSubmitAnswer={handleSubmitAnswer}
                        onLikeAnswer={() => {}}
                        onEdit={handleEdit}
                        onPin={handlePin}
                        onMarkSolved={handleMarkSolved}
                        onCloseQuestion={handleCloseQuestion}
                        onDelete={handleDelete}
                      />
                    </div>
                  )}

                  <div className="bg-white rounded-2xl border border-[#F1D8CC] shadow-md p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <h2 className="text-base font-semibold text-[#3D2A22]">All my questions</h2>
                      <span className="text-xs bg-[#FFF5F0] text-[#8B6F63] px-2 py-0.5 rounded-full border border-[#F1D8CC]">{unpinnedQuestions.length}</span>
                    </div>
                    <QuestionList
                      questions={unpinnedQuestions}
                      answersMap={{}}
                      currentUserId={currentUserId}
                      activeTab={activeTab}
                      onLike={handleLike}
                      onSaveLater={handleSaveLater}
                      onSubmitAnswer={handleSubmitAnswer}
                      onLikeAnswer={() => {}}
                      onEdit={handleEdit}
                      onPin={handlePin}
                      onMarkSolved={handleMarkSolved}
                      onCloseQuestion={handleCloseQuestion}
                      onDelete={handleDelete}
                    />
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-2xl border border-[#F1D8CC] shadow-md p-6">
                  <QuestionList
                    questions={filtered}
                    answersMap={{}}
                    currentUserId={currentUserId}
                    activeTab={activeTab}
                    onLike={handleLike}
                    onSaveLater={handleSaveLater}
                    onSubmitAnswer={handleSubmitAnswer}
                    onLikeAnswer={() => {}}
                    onEdit={handleEdit}
                    onPin={handlePin}
                    onMarkSolved={handleMarkSolved}
                    onCloseQuestion={handleCloseQuestion}
                    onDelete={handleDelete}
                  />
                </div>
              )}

              {nextCursor && (
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={() => setCurrentCursor(nextCursor)}
                    className="px-6 py-2 bg-[#3D2A22] text-white rounded-full text-sm font-medium hover:bg-[#2D1F1A]"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      

      <QuestionModal
        open={isModalOpen}
        title={newTitle}
        content={newContent}
        onClose={() => {
          setIsModalOpen(false);
          setEditingQuestionId(null);
          setNewTitle("");
          setNewContent("");
        }}
        onChangeTitle={setNewTitle}
        onChangeContent={setNewContent}
        onSubmit={handleCreateQuestion}
      />

      <div className={`fixed bottom-6 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 rounded-full border border-[#D4D4D8] bg-[#111827] px-5 py-3 text-center text-sm text-white shadow-xl transition-opacity duration-300 ${successToastVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        Question process handled successfully
      </div>
    </div>
  );
}