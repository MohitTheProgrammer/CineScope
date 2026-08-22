
const MovieSkeletons = () => {
    return (
        <div className="flex gap-5 overflow-hidden">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="w-44 shrink-0 sm:w-48 lg:w-52"
                >
                    <div
                        className="
                            aspect-2/3
                            animate-pulse
                            rounded-2xl
                            bg-white/5
                        "
                    />

                    <div
                        className="
                            mt-3
                            h-3
                            w-3/4
                            animate-pulse
                            rounded
                            bg-white/5
                        "
                    />

                    <div
                        className="
                            mt-2
                            h-2
                            w-1/2
                            animate-pulse
                            rounded
                            bg-white/5
                        "
                    />
                </div>
            ))}
        </div>
    );
};

export default MovieSkeletons