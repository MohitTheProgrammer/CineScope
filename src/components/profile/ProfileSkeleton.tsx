const ProfileSkeleton = () => {
    return (
        <main
            className="
                min-h-screen
                bg-(--bg-primary)
                px-5
                pb-20
                pt-28
                sm:px-6
                lg:px-8
            "
        >
            <div className="mx-auto max-w-7xl">
                <section
                    className="
                        animate-pulse
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-6
                        sm:p-8
                        lg:p-10
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-6
                            md:flex-row
                            md:items-center
                            md:justify-between
                        "
                    >
                        <div className="flex items-center gap-5">
                            <div
                                className="
                                    size-24
                                    rounded-full
                                    bg-white/10
                                    sm:size-28
                                "
                            />

                            <div>
                                <div
                                    className="
                                        h-3
                                        w-28
                                        rounded
                                        bg-white/10
                                    "
                                />

                                <div
                                    className="
                                        mt-3
                                        h-7
                                        w-44
                                        rounded
                                        bg-white/10
                                    "
                                />

                                <div
                                    className="
                                        mt-2
                                        h-4
                                        w-52
                                        rounded
                                        bg-white/10
                                    "
                                />
                            </div>
                        </div>

                        <div
                            className="
                                h-11
                                w-24
                                rounded-xl
                                bg-white/10
                            "
                        />
                    </div>
                </section>

                <section
                    className="
                        mt-6
                        animate-pulse
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-6
                        sm:p-8
                    "
                >
                    <div className="h-3 w-28 rounded bg-white/10" />

                    <div className="mt-3 h-7 w-56 rounded bg-white/10" />

                    <div className="mt-8 h-3 w-24 rounded bg-white/10" />

                    <div className="mt-2 h-12 max-w-xl rounded-xl bg-white/10" />

                    <div className="mt-8 h-3 w-28 rounded bg-white/10" />

                    <div className="mt-4 flex gap-4">
                        {Array.from(
                            { length: 6 },
                            (_, index) => (
                                <div
                                    key={index}
                                    className="
                                        size-16
                                        rounded-full
                                        bg-white/10
                                        sm:size-20
                                    "
                                />
                            )
                        )}
                    </div>

                    <div className="mt-8 h-11 w-32 rounded-xl bg-white/10" />
                </section>
            </div>
        </main>
    );
};

export default ProfileSkeleton;