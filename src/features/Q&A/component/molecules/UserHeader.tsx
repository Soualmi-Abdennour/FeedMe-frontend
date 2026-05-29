
import { AvatarAtom } from "../atoms/AvatarAtom";
import Text from "../atoms/ActionBarText";
import { IUserHeaderProps } from "../../types/props.types";



export default function UserHeader({
  username,
  initials,
  backgroundColor,
  date,
  handle,
}: IUserHeaderProps) {
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
 {new Date(date).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short", 
  year: "numeric",
})} {new Date(date).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
})}
</Text>
      </div>
    </div>
  );
}
