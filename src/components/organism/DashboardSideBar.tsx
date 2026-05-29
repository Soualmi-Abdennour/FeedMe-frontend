"use client"
import { DASHBOARD_NAVIGATION_ITEMS, SETTINGS_NAVIGATION_ITEMS } from "@/constants/app.constants";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import AppNavItem from "../molecules/AppNavItem";
import Link from "next/link";
import { TextLabel } from "@/features/Q&A/component/atoms/TextLabel";
import { ButtonWithIcon } from "../molecules/ButtonWithIcon";

{/* <AppNavItem
    key={item.label}
    path={item.path[0]}
    label={item.label}
    isActive={item.path.includes(pathName)}
/> */}
function DashboardSideBar() {
    const pathName = usePathname()
    return (
        <aside className="bg-white rounded-2xl p-6 h-fit sticky top-4  max-w-xs w-[260px]">
            <TextLabel variant="h3" className="font-bold mb-5 text-[#3D2A22]">
                Dashboard Navigation
            </TextLabel>
            <nav className="space-y-3">
                {DASHBOARD_NAVIGATION_ITEMS.map((item) => (
                    <Link
                        key={item.label}
                        href={item.path[0]}
                        className="block"
                    >
                        <ButtonWithIcon
                            variant={item.path.includes(pathName) ? 'primary' : 'ghost'}
                            size="md"
                            className={`w-full justify-start ${item.path.includes(pathName) ? '' : 'text-[#5C4338] hover:bg-[#FFF5F0]'}`}
                        >
                            <span className="text-lg">{item.label}</span>
                        </ButtonWithIcon>
                    </Link>
                ))}
            </nav>
        </aside >
    );
}

export default DashboardSideBar;