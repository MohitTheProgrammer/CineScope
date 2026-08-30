import { DnaIcon } from "../../assets/icons/Icons";

const RecommendationEmpty = () => {
    return (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
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
                <DnaIcon
                    className="
                        mx-auto
                        size-12
                        text-(--accent-primary)
                    "
                />

                <h2 className="mt-5 text-2xl font-black">
                    Your Movie DNA needs a little more data.
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/35">
                    Like, watch, rate or save a few movies
                    and CineScope will have enough information
                    to find your next obsession.
                </p>
            </div>
        </section>
    );
};

export default RecommendationEmpty;