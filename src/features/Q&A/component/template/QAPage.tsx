'use client';

import { useState, useMemo } from "react";

// ORGANISMS
import Header from "../organism/Header";
import Sidebar from "../organism/Sidebar";
import { QuestionList } from "../organism/QuestionList";
import QuestionModal from "../organism/QuestionModal";
// mock DATA and TYPES
import { MOCK_QUESTIONS,MOCK_ANSWERS } from "../../constant/qa.mock";
import { QANavTab, QuestionModel,AnswerModel } from "../../type/qa.types";




export default function QAPage() {

  // ================= STATE =================
  const [questions, setQuestions] = useState<QuestionModel[]>(MOCK_QUESTIONS);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<QANavTab>("all");

const [answersMap, setAnswersMap] = useState<Record<string, AnswerModel[]>>(MOCK_ANSWERS);

const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);


const [isModalOpen, setIsModalOpen] = useState(false);
const [newTitle, setNewTitle] = useState("");
const [newContent, setNewContent] = useState("");
const [successToastVisible, setSuccessToastVisible] = useState(false);

  const MY_USER_ID = "me";

  // ================= FILTER =================
  const filtered = useMemo(() => {
    let list = questions;

    if (activeTab === "my-questions")
      list = list.filter(q => q.author.id === MY_USER_ID);

    if (activeTab === "my-answers")
      list = list.filter(q => q.isAnsweredByMe);
 
    if (activeTab === "answer-later")
      list = list.filter(q => q.isSavedForLater);

    if (search.trim()) {
      const s = search.toLowerCase();
      list = list.filter(
        q =>
          q.title.toLowerCase().includes(s) ||
          q.description?.toLowerCase().includes(s)
      );
    }

    return list;
  }, [questions, search, activeTab]);
const pinnedQuestions = useMemo(
  () => filtered.filter(q => q.isPinned),
  [filtered]
);

const unpinnedQuestions = useMemo(
  () => filtered.filter(q => !q.isPinned),
  [filtered]
);





  // ================= ACTIONS =================

// ================= ACTIONS =================

const handleEdit = (questionId: string) => {
  const q = questions.find((q) => q.id === questionId);
  if (!q) return;
  setEditingQuestionId(questionId);   // نحفظو id ديال اللي كنعدلو
  setNewTitle(q.title);               // نملاو المودال بالبيانات الحالية
  setNewContent(q.description ?? "");
  setIsModalOpen(true);               // نفتحو المودال
};

const handlePin = (questionId: string) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === questionId ? { ...q, isPinned: !q.isPinned } : q
    )
  );
};
const handleCloseQuestion = (questionId: string) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === questionId ? { ...q, isClosed: !q.isClosed } : q
    )
  );
};

const handleEditQuestion = (questionId: string) => {
  // placeholder: open edit flow or show a toast
  console.log("edit question", questionId);
};

const handlePinQuestion = (questionId: string) => {
  setQuestions((prev) =>
    prev.map((q) => (q.id === questionId ? { ...q, isPinned: !q.isPinned } : q))
  );
};

const handleMarkSolved = (questionId: string) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === questionId ? { ...q, isSolved: !q.isSolved } : q  // ← ! بدل true
    )
  );
};
const handleDeleteQuestion = (questionId: string) => {
  setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  setAnswersMap((prev) => {
    const copy = { ...prev };
    delete copy[questionId];
    return copy;
  });
};

const handleDelete = (questionId: string) => {
  setQuestions((prev) => prev.filter((q) => q.id !== questionId));
};

/***************************** */

const handleSubmitAnswer = (questionId: string, text: string) => {
  const newAnswer: AnswerModel = {
    id: crypto.randomUUID(),
    content: text,
    author: { id: MY_USER_ID, username: "Vous", handle: "@vous", avatarUrl: null },
    createdAt: new Date().toISOString(),
    likesCount: 0,
    isLiked: false,
  };
          setAnswersMap((prev) => ({
    ...prev,
    [questionId]: [...(prev[questionId] ?? []), newAnswer],
  }));

  setQuestions((prev) =>
    prev.map((q) =>
      q.id === questionId
        ? { ...q, answersCount: q.answersCount + 1, isAnsweredByMe: true }
        : q
    )
  );
};

const handleLikeAnswer = (questionId: string, answerId: string) => {
  setAnswersMap((prev) => ({
    ...prev,
    [questionId]: (prev[questionId] ?? []).map((a) =>
      a.id === answerId
        ? { ...a, isLiked: !a.isLiked, likesCount: a.isLiked ? a.likesCount - 1 : a.likesCount + 1 }
        : a
    ),
  }));
};

const handleCreateQuestion = () => {
  if (newTitle.trim().length < 5) return;

  if (editingQuestionId) {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === editingQuestionId
          ? { ...q, title: newTitle, description: newContent }
          : q
      )
    );
    setEditingQuestionId(null);
  } else {
    const newQuestion: QuestionModel = {
      id: crypto.randomUUID(),
      title: newTitle,
      description: newContent,
      author: { id: MY_USER_ID, username: "Vous", handle: "@vous", avatarUrl: null },
      createdAt: new Date().toISOString(),
      likesCount: 0, answersCount: 0,
      isLiked: false, isAnsweredByMe: false, isSavedForLater: false,
    };
    setQuestions((prev) => [newQuestion, ...prev]);
  }

  setNewTitle("");
  setNewContent("");
  setIsModalOpen(false);
  setSuccessToastVisible(true);
  window.setTimeout(() => setSuccessToastVisible(false), 3000);
};




  const handleLike = (id: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === id
          ? {
              ...q,
              isLiked: !q.isLiked,
              likesCount: q.isLiked
                ? q.likesCount - 1
                : q.likesCount + 1,
            }
          : q
      )
    );
  };

  const handleSaveLater = (id: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === id
          ? { ...q, isSavedForLater: !q.isSavedForLater }
          : q
      )
    );
  };

 return (
  <div className="min-h-screen w-full bg-[#FFF5F0] flex text-[#2D1F1A]">

    {/* MAIN CONTENT */}
    <div className="flex-1 flex flex-col">

      {/* HEADER */}
      <div className="border-b border-[#F1D8CC] bg-white shadow-sm">
        <Header
          searchValue={search}
          onSearch={setSearch}
          onAskQuestion={() => setIsModalOpen(true)}
        />
      </div>

      {/* PAGE BODY */}
      <div className="px-6 md:px-10 py-8 flex justify-center">
        <div className="w-full max-w-5xl space-y-6">

          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-bold text-[#3D2A22]">
              Q&A: Ask your questions
            </h1>

            <p className="text-sm text-[#8B6F63] mt-2">
              Share your cooking questions and get help from the community.
            </p>
</div>
    {/* QUESTION CARD CONTAINER */}
<div className="space-y-6">

  {activeTab === "my-questions" ? (
    <>
      {/* PINNED SECTION */}
      {pinnedQuestions.length > 0 && (
        <div className="bg-white rounded-2xl border border-orange-200 shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-orange-500">
              {/* Pin icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>
              </svg>
            </span>
            <h2 className="text-base font-semibold text-orange-700">
              Pinned questions
            </h2>
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
              {pinnedQuestions.length}
            </span>
          </div>

          <QuestionList
            questions={pinnedQuestions}
            answersMap={answersMap}
            currentUserId={MY_USER_ID}
            activeTab={activeTab}
            onLike={handleLike}
            onSaveLater={handleSaveLater}
            onSubmitAnswer={handleSubmitAnswer}
            onLikeAnswer={handleLikeAnswer}
            onEdit={handleEdit}
            onPin={handlePin}
            onMarkSolved={handleMarkSolved}
            onCloseQuestion={handleCloseQuestion}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* ALL MY QUESTIONS SECTION */}
      <div className="bg-white rounded-2xl border border-[#F1D8CC] shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-semibold text-[#3D2A22]">
            All my questions
          </h2>
          <span className="text-xs bg-[#FFF5F0] text-[#8B6F63] px-2 py-0.5 rounded-full border border-[#F1D8CC]">
            {unpinnedQuestions.length}
          </span>
        </div>

        <QuestionList
          questions={unpinnedQuestions}
          answersMap={answersMap}
          currentUserId={MY_USER_ID}
          activeTab={activeTab}
          onLike={handleLike}
          onSaveLater={handleSaveLater}
          onSubmitAnswer={handleSubmitAnswer}
          onLikeAnswer={handleLikeAnswer}
          onEdit={handleEdit}
          onPin={handlePin}
          onMarkSolved={handleMarkSolved}
          onCloseQuestion={handleCloseQuestion}
          onDelete={handleDelete}
        />
      </div>
    </>
  ) : (
    /* ALL OTHER TABS — section واحدة */
    <div className="bg-white rounded-2xl border border-[#F1D8CC] shadow-md p-6">
      <QuestionList
        questions={filtered}
        answersMap={answersMap}
        currentUserId={MY_USER_ID}
        activeTab={activeTab}
        onLike={handleLike}
        onSaveLater={handleSaveLater}
        onSubmitAnswer={handleSubmitAnswer}
        onLikeAnswer={handleLikeAnswer}
        onEdit={handleEdit}
        onPin={handlePin}
        onMarkSolved={handleMarkSolved}
        onCloseQuestion={handleCloseQuestion}
        onDelete={handleDelete}
      />
    </div>
  )}

</div>
        </div>
          </div>
    </div>

    {/* SIDEBAR */}
    <div className="w-[260px] bg-white border-l border-[#F1D8CC] shadow-sm">
      <Sidebar
        activeTab={activeTab}
        onQuestionsClick={() => setActiveTab("all")}
        onMyQuestionsClick={() => setActiveTab("my-questions")}
        onAnswersClick={() => setActiveTab("my-answers")}
        onRecentClick={() => setActiveTab("answer-later")}
      />
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

    <div
      className={`fixed bottom-6 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 rounded-full border border-[#D4D4D8] bg-[#111827] px-5 py-3 text-center text-sm text-white shadow-xl transition-opacity duration-300 ${successToastVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-live="polite"
    >
      Question added successfully
    </div>

  </div>
);
}