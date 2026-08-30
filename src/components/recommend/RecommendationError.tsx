import {
    ArrowRightIcon,
    FilmIcon,
} from "../../assets/icons/Icons";

interface RecommendationErrorProps {
    message: string;
    onRetry: () => void;
}

const RecommendationError = ({
    message,
    onRetry,
}: RecommendationErrorProps) => {
    return (
        <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div
                className="
                    rounded-4xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-6
                    py-20
                    text-center
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        size-16
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-(--accent-primary)/20
                        bg-(--accent-primary)/10
                        text-(--accent-primary)
                    "
                >
                    <FilmIcon className="size-7" />
                </div>

                <h2 className="mt-6 text-2xl font-black">
                    The movie universe glitched.
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/35">
                    {message}
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="
                        mt-8
                        inline-flex
                        items-center
                        gap-3
                        rounded-xl
                        bg-(--accent-primary)
                        px-7
                        py-3.5
                        text-sm
                        font-black
                        text-black
                        shadow-[0_15px_45px_var(--accent-glow)]
                        transition-all
                        hover:-translate-y-1
                    "
                >
                    Try again

                    <ArrowRightIcon className="size-4" />
                </button>
            </div>
        </section>
    );
};

export default RecommendationError;