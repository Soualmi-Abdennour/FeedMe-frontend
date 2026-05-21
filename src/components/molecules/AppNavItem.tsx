import { IAppNavItemProps } from "@/types/props.types";
import Link from "next/link";

function AppNavItem({ path, label, icon: Icon, isActive }: IAppNavItemProps) {
    return (
        <Link href={path}>
            <div className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-lg
                transition-all duration-200 ease-in-out cursor-pointer
                ${isActive
                    ? 'bg-primary-400 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
            `}>
                {Icon && <Icon size={20} className="shrink-0" />}
                <span className={`
                    font-medium whitespace-nowrap
                    transition-opacity duration-200
                    ${Icon
                        ? 'opacity-0 group-hover/sidebar:opacity-100'
                        : 'opacity-100'
                    }
                `}>
                    {label}
                </span>
            </div>
        </Link>
    );
}

export default AppNavItem;