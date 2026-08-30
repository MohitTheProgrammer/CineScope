import {
    FlameIcon,
    BrainIcon,
    EyeIcon,
    FilmIcon,
} from "../../assets/icons/Icons";

import ActivityCard from "./ActivityCard";

interface TasteBreakdownProps {
    activity: {
        liked: number;
        rated: number;
        watchlisted: number;
        watched: number;
    };
}

const TasteBreakdown = ({
    activity,
}: TasteBreakdownProps) => {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-7
                    sm:p-10
                "
            >
                <div
                    className="
                        pointer-events-none
                        absolute
                        right-0
                        top-0
                        size-64
                        rounded-full
                        bg-(--accent-primary)/5
                        blur-3xl
                    "
                />

                <div className="relative">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-(--accent-primary)">
                            Your activity
                        </p>

                        <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
                            How CineScope Knows You
                        </h2>
                    </div>

                    <div
                        className="
                            mt-8
                            grid
                            gap-4
                            sm:grid-cols-2
                            lg:grid-cols-4
                        "
                    >
                        <ActivityCard
                            icon={FlameIcon}
                            label="Liked"
                            value={activity.liked}
                        />

                        <ActivityCard
                            icon={BrainIcon}
                            label="Rated"
                            value={activity.rated}
                        />

                        <ActivityCard
                            icon={EyeIcon}
                            label="Watchlisted"
                            value={
                                activity.watchlisted
                            }
                        />

                        <ActivityCard
                            icon={FilmIcon}
                            label="Watched"
                            value={
                                activity.watched
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TasteBreakdown;