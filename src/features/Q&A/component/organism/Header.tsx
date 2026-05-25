/**
 * ORGANISM: Header
 * 
 * Rôle: En-tête principal du site avec titre, recherche et bouton CTA.
 * Composée de: SearchBar (molecule) + Button (atom) + Text (atom)
 * Utilisé dans: MainLayout
 * 
 * Props:
 * - onSearch?: Function called when searching
 * - onAskQuestion?: Function called when the "Ask a question" button is clicked
 * - searchValue?: Current search value
 */

import SearchBar from "../molecules/SearchBar";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { Pencil } from "lucide-react";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onAskQuestion: () => void;
  searchValue?: string;
}
export default function Header({
  onSearch,
  onAskQuestion,
  searchValue,
}: HeaderProps) {
  const handleAskQuestion = () => {
    onAskQuestion();
  };

  return (
    <header className="bg-white border-b border-[#F1D8CC] py-6 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Text variant="h2" className="text-[#3D2A22] font-bold">
    Q&A: Ask questions, find answers!
            </Text>

            <Text
              variant="body"
              className="text-[#8B6F63] mt-1"
            >
    Share your cooking questions and learn together.
            </Text>
          </div>

         
        </div>

        {/* SEARCH + CTA */}
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <SearchBar
              value={searchValue}
              onChange={onSearch}
              placeholder="Search..."
            />
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleAskQuestion}
            icon={<Pencil size={18} />}
          >
            Ask a question
          </Button>
        </div>
      </div>
    </header>
  );
}