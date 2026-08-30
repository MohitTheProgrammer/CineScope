const ForYouSkeleton = () => {
    return (
        <main
            className="
                min-h-screen
                bg-(--bg-primary)
                text-white
            "
        >
            <section
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    pb-20
                    pt-28
                    lg:px-8
                "
            >
                <div className="animate-pulse">
                    <div
                        className="
                            h-3
                            w-32
                            rounded
                            bg-white/10
                        "
                    />

                    <div
                        className="
                            mt-5
                            h-16
                            max-w-xl
                            rounded
                            bg-white/10
                        "
                    />

                    <div
                        className="
                            mt-5
                            h-5
                            max-w-2xl
                            rounded
                            bg-white/5
                        "
                    />
                </div>

                <div
                    className="
                        mt-14
                        h-72
                        animate-pulse
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                    "
                />
            </section>
        </main>
    );
};

export default ForYouSkeleton;