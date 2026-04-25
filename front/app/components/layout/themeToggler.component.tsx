'use client'

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { LuMoon, LuSun } from "react-icons/lu"

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    if (!mounted) return null

    return (
        <button 
            type="button" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? <LuSun size={"1.5em"} /> : <LuMoon size={"1.5em"} />}
        </button>
    )
}