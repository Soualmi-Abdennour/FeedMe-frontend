/**
 * MOLECULE: UserHeader
 * 
 * Rôle: Combine Avatar + Nom d'utilisateur + Date pour afficher l'en-tête d'une question/réponse.
 * Composée de: Avatar (atom) + Text (atom)
 * Utilisé dans: QuestionCard, AnswerCard
 * 
 * Props:
 * - username: Nom de l'utilisateur
 * - initials: Initiales de l'utilisateur
 * - backgroundColor: Couleur de fond de l'avatar
 * - date: Date de création
 * - handle?: Pseudo/handle de l'utilisateur (optionnel)
 */

import { AvatarAtom } from "../atoms/AvatarAtom";
import Text from "../atoms/Text";

interface UserHeaderProps {
  username: string;
  initials: string;
  backgroundColor: string;
  date: string;
  handle?: string;
}

export default function UserHeader({
  username,
  initials,
  backgroundColor,
  date,
  handle,
}: UserHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <AvatarAtom name={username} avatarUrl={null} size="md" />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Text variant="body" className="font-semibold text-[#3D2A22]">
            {username}
          </Text>
          {handle && (
            <Text variant="small" color="muted" className="text-gray-500">
              @{handle}
            </Text>
          )}
        </div>
        <Text variant="small" color="muted" className="text-gray-500">
          {date}
        </Text>
      </div>
    </div>
  );
}
