/**
 * ORGANISM: Sidebar
 * 
 * Rôle: Barre latérale de navigation simplifiée (sans catégories).
 * Composée de: Button (atom) x N
 * Utilisé dans: MainLayout
 * 
 * Props:
 * - onQuestionsClick?: Fonction appelée au clic sur "الأسئلة"
 * - onMyQuestionsClick?: Fonction appelée au clic sur "أسئلتي"
 * - onAnswersClick?: Fonction appelée au clic sur "أجوبتي"
 * - onRecentClick?: Fonction appelée au clic sur "أحب لاحقاً"
 */
import Button from "../atoms/Button";
import Text from "../atoms/ActionBarText";

import {
  HelpCircle,
  User,
  MessageCircle,
  Clock,
} from "lucide-react";
import { ISidebarProps } from "../../types/props.types";



export default function QASidebar({
  activeTab,
  onQuestionsClick,
  onMyQuestionsClick,
  onAnswersClick,
  onRecentClick,
}: ISidebarProps) {
  return (
    <aside className="bg-white rounded-2xl p-6 h-fit sticky top-4 w-full max-w-xs">
      
      <Text variant="h3" className="font-bold mb-5 text-[#3D2A22]">
        Q&A Navigation
      </Text>

      <nav className="space-y-3">

        <Button
          variant={activeTab === 'all' ? 'primary' : 'ghost'}
          size="md"
          onClick={onQuestionsClick}
          className={`w-full justify-start ${activeTab === 'all' ? '' : 'text-[#5C4338] hover:bg-[#FFF5F0]'}`}
          icon={<HelpCircle size={18} />}
        >
          <span className="text-lg">Questions</span>
        </Button>

        <Button
          variant={activeTab === 'my-questions' ? 'primary' : 'ghost'}
          size="md"
          onClick={onMyQuestionsClick}
          className={`w-full justify-start ${activeTab === 'my-questions' ? '' : 'text-[#5C4338] hover:bg-[#FFF5F0]'}`}
          icon={<User size={18} />}
        >
          <span className="text-lg">My Questions</span>
        </Button>

        <Button
          variant={activeTab === 'my-answers' ? 'primary' : 'ghost'}
          size="md"
          onClick={onAnswersClick}
          className={`w-full justify-start ${activeTab === 'my-answers' ? '' : 'text-[#5C4338] hover:bg-[#FFF5F0]'}`}
          icon={<MessageCircle size={18} />}
        >
          <span className="text-lg">My Answers</span>
        </Button>

        <Button
          variant={activeTab === 'answer-later' ? 'primary' : 'ghost'}
          size="md"
          onClick={onRecentClick}
          className={`w-full justify-start ${activeTab === 'answer-later' ? '' : 'text-[#5C4338] hover:bg-[#FFF5F0]'}`}
          icon={<Clock size={18} />}
        >
          <span className="text-lg">Saved for Later</span>
        </Button>

      </nav>
    </aside>
  );
}