import { Avatar } from "@/components/atoms/Avatar";
import { IAccountHeader } from "../../types/props.types";



export const AccountHeader = ({ fullName, userName, avatarSrc }: IAccountHeader) => (
  <div className="flex items-center top-10 right-16 gap-4 p-2 pl-4 bg-white border border-gray-200 rounded-2xl shadow-sm w-fit">
  {/* Label */}
  <span className="text-sm font-bold text-gray-900">
    Account holder:
  </span>

  {/* User Info Section */}
  <div className="flex items-center gap-3">
    <Avatar
      src={avatarSrc}
      alt={fullName}
      size="md"
      className="border border-gray-100 shadow-sm" 
      fallback={fullName[0].toUpperCase()}
    />
    
    <div className="flex flex-col justify-center">
      <span className="font-bold text-[15px] text-gray-800 leading-none mb-1">
        {fullName}
      </span>
      <span className="text-[12px] text-gray-500 leading-none">
        {userName}
      </span>
    </div>
  </div>
  </div>
);