interface MyListHeaderProps {
    searchQuery: string;
    onSearchChange: (
        query: string
    ) => void;
}

const MyListHeader = ({
    searchQuery,
    onSearchChange,
}: MyListHeaderProps) => {
    return (
        <header>
            <p
                className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-(--accent-primary)
                "
            >
                Personal collection
            </p>

            <h1
                className="
                    mt-3
                    text-4xl
                    font-black
                    text-white
                    sm:text-5xl
                "
            >
                My List
            </h1>

            <p className="mt-3 text-white/60">
                Your movies, organised by how
                you saved them.
            </p>

            <div className="relative mt-8 max-w-md">
                <label
                    htmlFor="my-list-search"
                    className="sr-only"
                >
                    Search your list
                </label>

                <input
                    id="my-list-search"
                    type="search"
                    value={searchQuery}
                    onChange={(event) =>
                        onSearchChange(
                            event.target.value
                        )
                    }
                    placeholder="Search your movies..."
                    className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-3
                        text-sm
                        text-white
                        outline-none
                        transition-colors
                        placeholder:text-white/35
                        focus:border-(--accent-primary)
                    "
                />
            </div>
        </header>
    );
};

export default MyListHeader;