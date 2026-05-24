import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { IAppNavItemProps } from "@/types/props.types";
import { usePathname } from "next/navigation";

function AppNavItem({
    path,
    label,
    icon: Icon,
    isActive,
    children,
}: IAppNavItemProps) {
    const [isOpen, setIsOpen] = useState(isActive);
    const hasChildren = children && children.length > 0;
    const pathName = usePathname();

if (hasChildren) {
    return (
        <div>
        {/* Parent toggle button — no Link, just expands */}
        <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out cursor-pointer
            ${pathName.startsWith(`/${path}`)
                ? "bg-blue-500 text-white shadow-md"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
        >
            <Icon size={20} />
            <span className="font-medium flex-1 text-left">{label}</span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Sub-items */}
        {isOpen && (
            <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-gray-200 pl-3">
            {children.map((child) => {
                const childHref = `/${child.path}`; 
                const isChildActive = pathName === childHref;
                return (
                <Link key={child.path} href={childHref}>
                    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer text-sm
                    ${isChildActive
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                    >
                    <child.icon size={16} />
                    <span className="font-medium">{child.label}</span>
                    </div>
                </Link>
                );
            })}
            </div>
        )}
        </div>
    );
    } 

  // Regular nav item
return (
    <Link href={`/home/${path}`}>
        <div
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out cursor-pointer
            ${isActive
            ? "bg-blue-500 text-white shadow-md"
            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
        </div>
    </Link>
    );
}

export default AppNavItem;