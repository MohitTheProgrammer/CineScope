import {
    SparklesIcon,
    StarIcon,
    TargetIcon,
} from "../../assets/icons/Icons";

interface RatingDemoProps {
    rating: number;
    onRatingChange: (rating: number) => void;
}

const RatingDemo = ({
    rating,
    onRatingChange,
}: RatingDemoProps) => {
    return (
        <div className="w-full max-w-lg">
            <div
                className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-7
                "
            >
                <div className="text-center">
                    <div
                        className={`
                            mx-auto
                            flex
                            size-16
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            transition-all
                            duration-300
                            ${
                                rating >= 3
                                    ? "border-(--accent-primary)/30 bg-(--accent-primary)/10"
                                    : rating >= 2.5
                                      ? "border-yellow-400/20 bg-yellow-400/10"
                                      : "border-white/10 bg-white/5"
                            }
                        `}
                    >
                        {rating >= 3 ? (
                            <StarIcon className="size-8 text-(--accent-secondary)" />
                        ) : rating >= 2.5 ? (
                            <SparklesIcon className="size-8 text-yellow-400" />
                        ) : (
                            <TargetIcon className="size-8 text-white/40" />
                        )}
                    </div>

                    <div className="mt-4 text-6xl font-black">
                        {rating.toFixed(1)}
                    </div>

                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">
                        Your rating
                    </p>
                </div>

                <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={rating}
                    onChange={(event) =>
                        onRatingChange(
                            Number(event.target.value)
                        )
                    }
                    className="
                        mt-10
                        w-full
                        accent-(--accent-primary)
                    "
                />

                <div className="mt-3 flex justify-between text-[10px] font-bold text-white/20">
                    <span>1 — Didn't love it</span>
                    <span>10 — Absolutely loved it</span>
                </div>
            </div>
        </div>
    );
};

export default RatingDemo;