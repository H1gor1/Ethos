"use client";

import { LuSearch, LuUser } from "react-icons/lu"
import { useTheme } from "@/app/hooks/useTheme";

export function Header() {
    const { isDark, toggle } = useTheme();

    return (
    <div className="flex flex-row justify-between">
        <div>
            <h1>Ethos</h1>
        </div>
        <div className="flex gap-2">
            Buscando... 
            <LuSearch />
        </div>
        <div className="flex">
            <LuUser />
            <button onClick={toggle} aria-label="Alternar tema">
                {isDark ? "☀️ Claro" : "🌙 Escuro"}
            </button>
        </div>
    </div>
    );
}