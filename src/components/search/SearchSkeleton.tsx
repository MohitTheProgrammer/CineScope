const SearchSkeleton = () => {
    return (
        <div
            className="
                grid
                grid-cols-2
                gap-x-5
                gap-y-10
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
            "
        >
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index}>
                    <div
                        className="
                            aspect-2/3
                            animate-pulse
                            rounded-2xl
                            bg-white/5
                        "
                    />

                    <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-white/5" />

                    <div className="mt-2 h-2 w-1/2 animate-pulse rounded bg-white/5" />
                </div>
            ))}
        </div>
    );
};

export default SearchSkeleton