"use client"
import { SETTINGS_NAVIGATION_ITEMS } from "@/constants/app.constants";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import AppNavItem from "../molecules/AppNavItem";

function SettingsSidebar() {
    const pathName = usePathname()


    return (
        <aside className="w-52 h-full bg-white border-r border-gray-200 pt-5  ">
            <nav className="flex-1 px-4">
                <div className="flex flex-col space-y-2">
                    {SETTINGS_NAVIGATION_ITEMS.map((item) => (
                        <AppNavItem
                            key={item.label}
                            path={item.path[0]}
                            label={item.label}
                            isActive={item.path.includes(pathName)}
                        />
                    ))}
                </div>
            </nav>
        </aside>
    );
}

export default SettingsSidebar;