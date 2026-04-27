"use client"
import { APP_NAVIGATION_ITEMS } from "@/constants/app.constants";
import { usePathname, useRouter } from "next/navigation";
import AppNavItem from "../molecules/AppNavItem";
import { LogOut } from "lucide-react";

function AppSidebar() {
    const router = useRouter()
    const pathName = usePathname()

    const handleLogout = () => {
        // handle logout logic
    }

    return (
        <aside className="w-56 h-full bg-white border-r border-gray-200 flex flex-col">
            {/* Orange Logo */}
            <div className="p-6 pb-8">
                <div className="w-12 h-12 bg-orange-500 rounded-lg" />
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4">
                <div className="flex flex-col space-y-2">
                    {APP_NAVIGATION_ITEMS.map((item) => (
                        <AppNavItem
                            key={item.label}
                            path={item.path}
                            label={item.label}
                            icon={item.icon}
                            isActive={pathName === item.path || pathName.startsWith(item.path)}
                        />
                    ))}
                </div>
            </nav>

            {/* Log Out */}
            <div className="p-6 pt-4 border-t border-orange-300">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors font-medium"
                >
                    <LogOut size={18} />
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
}

export default AppSidebar;