/**
 * ORGANISM: Header
 * 
 * Rôle: En-tête principal du site avec titre, recherche et bouton CTA.
 * Composée de: SearchBar (molecule) + Button (atom) + TextLabel (atom)
 * Utilisé dans: MainLayout
 * 
 * Props:
 * - onSearch?: Function called when searching
 * - onAskQuestion?: Function called when the "Ask a question" button is clicked
 * - searchValue?: Current search value
 */

import { QASearchBar } from "../molecules/QASearchBar";
import {TextLabel} from "../atoms/TextLabel";
import { Pencil } from "lucide-react";
import { IHeaderProps } from "../../types/props.types";
import { ButtonWithIcon } from "@/components/molecules/ButtonWithIcon";


export  function QAPageHeader({
  onSearch,
  onAskQuestion,
  searchValue,
}: IHeaderProps) {
  const handleAskQuestion = () => {
    onAskQuestion();
  };

  return (
    <header className="bg-white border-b border-[#F1D8CC] py-6 px-6 shadow-sm ">
      <div className="max-w-7xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <TextLabel variant="h2" className="text-[#3D2A22] font-bold">
              Q&A: Ask questions, find answers!
            </TextLabel>

            <TextLabel
              variant="body"
              className="text-[#8B6F63] mt-1"
            >
              Share your cooking questions and learn together.
            </TextLabel>
          </div>


        </div>

        {/* SEARCH + CTA */}
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <QASearchBar
              value={searchValue}
              onChange={onSearch}
              placeholder="Search..."
            />
          </div>

          <ButtonWithIcon
            variant="primary"
            size="md"
            onClick={handleAskQuestion}
            icon={<Pencil size={18} />}
          >
            Ask a question
          </ButtonWithIcon>
        </div>
      </div>
    </header>
  );
}