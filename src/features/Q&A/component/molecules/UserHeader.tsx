import Link from 'next/link'
import { AvatarAtom } from "../atoms/AvatarAtom";
import { TextLabel } from "../atoms/TextLabel";
import { IUserHeaderProps } from "../../types/props.types";



export function UserHeader({
  userName,
  date,
  handle,
}: IUserHeaderProps) {
  return (
    <Link href={`/profile/${userName}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <AvatarAtom name={userName} avatarUrl={null} size="md" />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <TextLabel variant="body" className="font-semibold text-[#3D2A22]">
            {userName}
          </TextLabel>
          {handle && (
            <TextLabel variant="small" color="muted" className="text-gray-500">
              @{handle}
            </TextLabel>
          )}
        </div>
        <TextLabel variant="small" color="muted" className="text-gray-500">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}{" "}
          {new Date(date).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </TextLabel>
      </div>
    </Link>
  );
}