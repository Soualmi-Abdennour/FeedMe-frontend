import { IAppNavItemProps } from "@/types/props.types";
import { Button } from "../ui/button";
import Link from "next/link";

function AppNavItem ({
    path,
    label,
    icon: Icon,
    isActive,
}:IAppNavItemProps) {
    return (
        <Link href={`/home/${path}`}>
            <div
                className={`
          w-full flex items-center gap-3 px-4 py-3 rounded-lg
          transition-all duration-200 ease-in-out cursor-pointer
          ${isActive
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
        `}
            >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
            </div>
        </Link>
    );
};

export default AppNavItem;