"use client"
import { SETTINGS_NAVIGATION_ITEMS } from "@/constants/app.constants";
import { TextLabel } from "@/features/Q&A/component/atoms/TextLabel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonWithIcon } from "../molecules/ButtonWithIcon";

function SettingsSidebar() {
    const pathName = usePathname()


    return (
        <aside className="bg-white rounded-2xl p-6 h-fit sticky top-4 w-[260px] max-w-xs">
            <TextLabel variant="h3" className="font-bold mb-5 text-[#3D2A22]">
                Settings Navigation
            </TextLabel>
            <nav className="space-y-3">
                {SETTINGS_NAVIGATION_ITEMS.map((item) => (
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

export default SettingsSidebar;