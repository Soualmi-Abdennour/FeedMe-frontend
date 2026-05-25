/**
 * MOLECULE: ActionBar
 * 
 * Rôle: Barre d'actions pour les questions et réponses (likes, commentaires, etc.).
 * Composée de: Icon (atom) + Text (atom) + Button (atom)
 * Utilisé dans: QuestionCard, AnswerCard
 * 
 * Props:
 * - likes: Nombre de likes
 * - comments: Nombre de commentaires
 * - onLike?: Fonction appelée au clic sur like
 * - onComment?: Fonction appelée au clic sur commentaire
 * - onReply?: Fonction appelée au clic sur répondre
 * - isLiked?: Si true, le like est actif
 */

import { Icon } from "../atoms/Icon";
import Text from "../atoms/Text";
import { Bookmark, Check } from "lucide-react";

interface ActionBarProps {
  likes: number;
  comments?: number;
  onLike?: () => void;
  onComment?: () => void;
  onReply?: () => void;
  isLiked?: boolean;
  isSaved?: boolean;
}

export default function ActionBar({
  likes,
  comments = 0,
  onLike,
  onComment,
  onReply,
  isLiked = false,
  isSaved = false,
}: ActionBarProps) {
  return (
    <div className="flex items-center gap-6 py-2 mt-3 border-t border-gray-700">
      {/* Like Button */}
      <button
        onClick={onLike}
        className={`flex items-center gap-2 hover:text-orange-500 transition-colors ${isLiked ? 'text-orange-500' : 'text-gray-400'}`}
      >
        <Icon
        name="heart"
        filled={isLiked}
        color={isLiked ? "red" : "gray"}
        />
        
              <Text variant="small" className={isLiked ? "text-orange-500" : "text-gray-400"}>{likes}</Text>
      </button>

      {/* Comment Button */}
      {comments !== undefined && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComment?.();
          }}
          className="flex items-center gap-2 hover:text-orange-500 transition-colors text-gray-400"
        >
          <Icon name="comment" />
          <Text variant="small" className="text-gray-400">View answers ({comments})</Text>
        </button>
      )}

      {/* Reply Button */}
      {onReply && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onReply?.();
          }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
            isSaved
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-[#FFF8F4] text-[#5C4338] border-[#F1D8CC] hover:bg-[#FFEFE6]"
          }`}
        >
          {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
<span>{isSaved ? "Reply Later" : "Reply Later"}</span> 
      </button>
      )}
    </div>
  );
}
