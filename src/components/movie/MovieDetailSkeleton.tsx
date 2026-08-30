const MovieDetailSkeleton = () => {
    return (
        <main
            aria-busy="true"
            aria-label="Loading movie details"
            className="min-h-screen bg-(--bg-primary)"
        >
            <section
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    pb-16
                    pt-28
                    lg:px-8
                "
            >
                <div
                    className="
                        grid
                        gap-8
                        lg:grid-cols-[280px_1fr]
                        lg:gap-12
                    "
                >
                    <div
                        className="
                            mx-auto
                            w-full
                            max-w-70
                            lg:mx-0
                        "
                    >
                        <div
                            className="
                                aspect-2/3
                                animate-pulse
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                            "
                        />
                    </div>

                    <div className="flex flex-col justify-center">

                        <div className="mb-4 flex gap-2">
                            {[72, 88, 64].map(
                                (width) => (
                                    <div
                                        key={width}
                                        className="
                                            h-6
                                            animate-pulse
                                            rounded-full
                                            bg-white/10
                                        "
                                        style={{
                                            width: `${width}px`,
                                        }}
                                    />
                                )
                            )}
                        </div>

                        <div
                            className="
                                h-12
                                w-4/5
                                animate-pulse
                                rounded-xl
                                bg-white/10
                                sm:h-15
                            "
                        />

                        <div
                            className="
                                mt-5
                                h-5
                                w-52
                                animate-pulse
                                rounded
                                bg-white/10
                            "
                        />

                        <div className="mt-8">

                            <div
                                className="
                                    h-3
                                    w-20
                                    animate-pulse
                                    rounded
                                    bg-white/10
                                "
                            />

                            <div className="mt-4 space-y-3">
                                <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                                <div className="h-4 w-11/12 animate-pulse rounded bg-white/10" />
                                <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                            </div>

                            <div
                                className="
                                    mt-6
                                    grid
                                    grid-cols-1
                                    gap-3
                                    sm:grid-cols-2
                                    lg:flex
                                "
                            >
                                {[0, 1, 2].map(
                                    (index) => (
                                        <div
                                            key={index}
                                            className="
                                                h-12
                                                w-full
                                                animate-pulse
                                                rounded-xl
                                                border
                                                border-white/10
                                                bg-white/5
                                                lg:w-40
                                            "
                                        />
                                    )
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    pb-20
                    lg:px-8
                "
            >
                <div
                    className="
                        h-6
                        w-44
                        animate-pulse
                        rounded
                        bg-white/10
                    "
                />

                <div
                    className="
                        mt-6
                        grid
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    {[0, 1, 2, 3].map(
                        (index) => (
                            <div
                                key={index}
                                className="
                                    h-28
                                    animate-pulse
                                    rounded-2xl
                                    border
                                    border-white/10
                                    bg-white/5
                                "
                            />
                        )
                    )}
                </div>
            </section>
        </main>
    );
};

export default MovieDetailSkeleton;