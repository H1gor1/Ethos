"use client";

import { LuUser } from "react-icons/lu"
import { ThemeToggle } from "./themeToggler.component";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { SearchInput } from "../shared/input.component";

export function Header() {

    const { resolvedTheme } = useTheme()
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const logoSrc = mounted && resolvedTheme === "dark"
        ? "/ethos/ethos-dark.svg"
        : "/ethos/ethos.svg"

    const logoMobileSrc = mounted && resolvedTheme === "dark"
        ? "/ethos/pena-dark.svg"
        : "/ethos/pena.svg"

    return (
    <div className="flex flex-row justify-between border-b border-border pb-4">
        <div>
            <Image src={logoSrc} alt="Logo Ethos" width={110} height={28} priority className="hidden sm:flex"/>
            <Image src={logoMobileSrc} alt="Logo Ethos" width={55} height={14} priority className="flex sm:hidden"/>
        </div>
        <div className="hidden md:flex gap-2 text-center items-center">
            <SearchInput />
        </div>
        <div className="flex gap-4">
            <ThemeToggle />
            <button>
                <LuUser size={"1.5em"} />
            </button>
        </div>
    </div>
    );
}