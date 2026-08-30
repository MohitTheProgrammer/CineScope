import {
    ArrowRightIcon,
    SparklesIcon,
} from "../../assets/icons/Icons";

interface LoggedInStatusProps {
    onSeeDNA: () => void;
}

const LoggedInStatus = ({
    onSeeDNA,
}: LoggedInStatusProps) => {
    return (
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
                    flex
                    flex-col
                    gap-6
                    rounded-3xl
                    border
                    border-(--accent-primary)/20
                    bg-(--accent-primary)/5
                    p-6
                    sm:flex-row
                    sm:items-center
                    sm:p-8
                "
            >

                <div
                    className="
                        flex
                        size-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-(--accent-primary)/20
                        bg-(--accent-primary)/10
                        text-(--accent-primary)
                    "
                >
                    <SparklesIcon className="size-7" />
                </div>


                <div className="min-w-0 flex-1">
                    <p
                        className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-(--accent-primary)
                        "
                    >
                        You're already part of it
                    </p>

                    <h2
                        className="
                            mt-2
                            text-2xl
                            font-black
                            tracking-tight
                            text-white
                        "
                    >
                        CineScope is learning your taste.
                    </h2>

                    <p
                        className="
                            mt-2
                            max-w-2xl
                            text-sm
                            leading-6
                            text-white/40
                        "
                    >
                        Every movie you like and rate gives
                        your Movie DNA another piece of
                        information.
                    </p>
                </div>


                <button
                    type="button"
                    onClick={onSeeDNA}
                    className="
                        inline-flex
                        shrink-0
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-5
                        py-3
                        text-xs
                        font-bold
                        text-white
                        transition-all
                        duration-300
                        hover:border-(--accent-primary)/50
                        hover:bg-(--accent-primary)
                        hover:text-black
                    "
                >
                    See My DNA

                    <ArrowRightIcon className="size-4" />
                </button>
            </div>
        </section>
    );
};

export default LoggedInStatus;