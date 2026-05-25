import { useEffect, useRef } from "react";
import {
  Pencil,
  Pin,
  PinOff,
  CheckCircle2,
  Lock,
  
  Trash2,
  User,
  Link,
  LockOpen,
} from "lucide-react";

interface QuestionMenuProps {
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

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
  hint?: string;
}
//MenuItem is a reusable component for each action in the menu with consistent styling and behavior (disabled, danger, hint)
function MenuItem({ icon, label, onClick, danger = false, disabled = false, hint }: MenuItemProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); if (!disabled) onClick(); }}
      disabled={disabled}
      title={hint}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors
        ${disabled
          ? "opacity-35 cursor-not-allowed text-[#8B6F63]"
          : danger
            ? "text-red-500 hover:bg-red-50"
            : "text-[#3D2A22] hover:bg-[#FFF5F0]"
        }
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1">{label}</span>
    </button>
  );
}

export default function QuestionMenu({
  isOwner,
  isInMyQuestions,
  hasAnswers,
  isPinned,
  isSolved,
  isClosed,
  onEdit,
  onPin,
  onMarkSolved,
  onClose,
  onDelete,
  onViewProfile,
  onCopyLink,
  onDismiss,
}: QuestionMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onDismiss();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onDismiss]);

  const iconSize = 15;

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-8 z-50 w-52 bg-white border border-[#F1D8CC] rounded-2xl shadow-lg overflow-hidden py-1"
    >
      {isOwner ? (
        <>
          <MenuItem
            icon={<Pencil size={iconSize} />}
            label="Edit"
            onClick={onEdit}
          />

          <MenuItem
            icon={isPinned ? <PinOff size={iconSize} /> : <Pin size={iconSize} />}
            label={isPinned ? "Unpin" : "Pin"}
            onClick={onPin}
            disabled={!isInMyQuestions} // only allow pinning/unpinning from My Questions tab
            hint={!isInMyQuestions ? "Only available in My Questions tab" : undefined}
          />

          {/* <MenuItem
            icon={<CheckCircle2 size={iconSize} />}
            label="Mark as solved"
            onClick={onMarkSolved}
            disabled={!hasAnswers || isSolved}
            hint={!hasAnswers ? "No answers yet" : isSolved ? "Already solved" : undefined}
          /> */}
<MenuItem
  icon={<CheckCircle2 size={iconSize} />}
  label={isSolved ? "Mark as unsolved" : "Mark as solved"}
  onClick={onMarkSolved}
  disabled={!hasAnswers}
  hint={!hasAnswers ? "No answers yet" : undefined}
/>
          {/* <MenuItem
            icon={<Lock size={iconSize} />}
            label="Close question"
            onClick={onClose}
            disabled={isClosed}
            hint={isClosed ? "Already closed" : undefined}
          /> */}
            <MenuItem
            icon={isClosed ? <LockOpen size={iconSize} /> : <Lock size={iconSize} />}
            label={isClosed ? "Reopen question" : "Close question"}
            onClick={onClose}
            />
          <div className="my-1 border-t border-[#F1D8CC]" />

          <MenuItem
            icon={<Trash2 size={iconSize} />}
            label="Delete"
            onClick={onDelete}
            danger
          />
        </>
      ) : ( // For non-owners, only show view profile and copy link options; no edit/pin/mark solved/close/delete   
        <>
          <MenuItem
            icon={<User size={iconSize} />}
            label="View profile"
            onClick={onViewProfile}
          />
          <MenuItem
            icon={<Link size={iconSize} />}
            label="Copy link"
            onClick={onCopyLink}
          />
        </>
      )}
    </div>
  );
}