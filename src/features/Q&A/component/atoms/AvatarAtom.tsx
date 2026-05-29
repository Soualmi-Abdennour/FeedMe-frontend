import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IAvatarAtomProps } from "../../types/props.types";



const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function AvatarAtom({ name, avatarUrl, size = "md" }: IAvatarAtomProps) {
  const initials = (name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={sizeMap[size]}>
      {avatarUrl && <AvatarImage src={avatarUrl} alt={name || "User"} />}
      <AvatarFallback className="bg-orange-500 text-white font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
