interface SearchHeaderProps {
    query: string;
}

const SearchHeader = ({
    query,
}: SearchHeaderProps) => {
    return (
        <div className="mb-10">
            <div className="mb-3 flex items-center gap-2">
                <span
                    className="
                        size-1.5
                        rounded-full
                        bg-(--accent-primary)
                        shadow-[0_0_10px_var(--accent-primary)]
                    "
                />

                <span
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-(--accent-primary)
                    "
                >
                    Search
                </span>
            </div>

            <h1
                className="
                    text-3xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-4xl
                "
            >
                Results for{" "}

                <span className="text-(--accent-primary)">
                    "{query}"
                </span>
            </h1>

            <p className="mt-2 text-sm text-white/40">
                Discover movies matching your search.
            </p>
        </div>
    );
};

export default SearchHeader;