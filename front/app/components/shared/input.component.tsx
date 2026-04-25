import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { LuSearch } from "react-icons/lu";

export function SearchInput () {
    const { resolvedTheme } = useTheme()

    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    return (
        <div className="flex items-center gap-4 w-full max-w-5xl mx-auto px-4">
            <input
                placeholder="Search..."
                className="flex-1 min-w-0 bg-search rounded-lg px-4 py-2"
            />

            <button className="cursor-pointer shrink-0 bg-search rounded-lg px-4 py-3 hover:bg-search-hover hover:transition-all">
                <LuSearch />
            </button>
        </div>
    )
}