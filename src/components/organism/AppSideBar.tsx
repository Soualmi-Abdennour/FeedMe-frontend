"use client"
import {  RESTAURANT_APP_NAVIGATION_ITEMS, USER_APP_NAVIGATION_ITEMS } from "@/constants/app.constants";
import { usePathname } from "next/navigation";
import AppNavItem from "../molecules/AppNavItem";
import { LogOut } from "lucide-react";
import { useAppSelector } from "@/store/base.store";

function AppSidebar() {
    const pathName = usePathname()
    const {user}=useAppSelector(state=>state.user)
    const NAV_ITEMS=user?.role==="USER" ?USER_APP_NAVIGATION_ITEMS : RESTAURANT_APP_NAVIGATION_ITEMS
    const handleLogout = () => {
        // handle logout logic
    }

    return (
        <aside className="
            absolute z-50
            group/sidebar
            h-screen bg-white border-r border-gray-200
            flex flex-col
            w-16 hover:w-56
            transition-all duration-300 ease-in-out
            overflow-hidden
        ">
            {/* Logo */}
            <div className="p-3 flex items-center justify-center h-[72px] shrink-0">
                <div className="w-10 h-10 bg-orange-500 rounded-lg shrink-0" />
            </div>

            <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Navigation Items */}
                <nav className="px-2">
                    <div className="flex flex-col space-y-1">
                        {NAV_ITEMS.map((item) => (
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
                <div className="p-3 border-t border-orange-300 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="
                            w-full flex items-center gap-3 px-3 py-2 rounded-lg
                            text-orange-500 hover:text-orange-600 hover:bg-orange-50
                            transition-colors font-medium
                        "
                    >
                        <LogOut size={20} className="shrink-0" />
                        <span className="
                            whitespace-nowrap opacity-0 
                            group-hover/sidebar:opacity-100
                            transition-opacity duration-200
                        ">
                            Log Out
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default AppSidebar;