import { FilmReelIcon } from "../assets/icons/Icons";

const SplashScreen = () => {
    return (
        <main
            className="
                fixed
                inset-0
                z-9999
                flex
                min-h-screen
                items-center
                justify-center
                overflow-hidden
                bg-(--bg-primary)
                text-white
            "
        >
            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    size-96
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-(--accent-primary)/10
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    flex
                    flex-col
                    items-center
                "
            >
                <div
                    className="
                        flex
                        size-20
                        items-center
                        justify-center
                        rounded-3xl
                        border
                        border-(--accent-primary)/30
                        bg-(--accent-primary)/10
                        text-(--accent-primary)
                        shadow-[0_0_60px_var(--accent-glow)]
                        animate-pulse
                    "
                >
                    <FilmReelIcon className="size-10" />
                </div>

                <h1
                    className="
                        mt-6
                        text-4xl
                        font-black
                        tracking-[-0.04em]
                    "
                >
                    Cine<span className="text-(--accent-primary)">Scope</span>
                </h1>

                <p
                    className="
                        mt-2
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.35em]
                        text-white/30
                    "
                >
                    Discover your movie world
                </p>

                <div
                    className="
                        mt-10
                        h-1
                        w-28
                        overflow-hidden
                        rounded-full
                        bg-white/10
                    "
                >
                    <div
                        className="
                            h-full
                            w-1/2
                            rounded-full
                            bg-(--accent-primary)
                            shadow-[0_0_12px_var(--accent-glow)]
                            animate-[splash-loading_1.2s_ease-in-out_infinite]
                        "
                    />
                </div>
            </div>
        </main>
    );
};

export default SplashScreen;