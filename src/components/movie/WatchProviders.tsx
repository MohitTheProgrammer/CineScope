import type {
    WatchProvider,
    WatchProviders as WatchProvidersData,
} from "../../types/movie";

import { ProviderIcon, ChevronIcon, ArrowIcon } from "../../assets/icons/Icons"

interface WatchProvidersProps {
    providers: WatchProvidersData;
    open: boolean;
    onToggle: () => void;
}

const IMAGE_BASE_URL =
    "https://image.tmdb.org/t/p";

const WatchProviders = ({
    providers,
    open,
    onToggle,
}: WatchProvidersProps) => {
    const hasProviders =
        (providers.ads?.length ?? 0) > 0 ||
        (providers.free?.length ?? 0) > 0 ||
        (providers.flatrate?.length ?? 0) > 0 ||
        (providers.rent?.length ?? 0) > 0 ||
        (providers.buy?.length ?? 0) > 0;

    return (
        <section
            className="
                mx-auto
                max-w-7xl
                px-6
                pb-5
                lg:px-8
            "
        >
            {/* Heading */}

            <div>
                <div className="flex items-center gap-2">
                    <span
                        className="
                            size-1.5
                            rounded-full
                            bg-(--accent-primary)
                            shadow-[0_0_10px_var(--accent-glow)]
                        "
                    />

                    <span
                        className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.25em]
                            text-(--accent-primary)
                        "
                    >
                        Where to watch
                    </span>
                </div>

                <h2
                    className="
                        mt-2
                        text-2xl
                        font-black
                        tracking-tight
                        text-white
                        sm:text-3xl
                    "
                >
                    Watch Providers
                </h2>
            </div>

            {/* Expand / Collapse */}

            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className="
                    group
                    mt-6
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-5
                    py-5
                    text-left
                    transition-all
                    duration-300
                    hover:border-(--accent-primary)/25
                    hover:bg-(--accent-primary)/5
                "
            >
                <div className="flex items-center gap-4">
                    <div
                        className="
                            flex
                            size-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            text-white/60
                            transition-all
                            group-hover:border-(--accent-primary)/20
                            group-hover:bg-(--accent-primary)/10
                            group-hover:text-(--accent-primary)
                        "
                    >
                        <ProviderIcon />
                    </div>

                    <div>
                        <p className="text-sm font-bold text-white">
                            View Watch Sources
                        </p>

                        <p className="mt-1 text-xs text-white/35">
                            See where this movie is available
                        </p>
                    </div>
                </div>

                <ChevronIcon open={open} />
            </button>

            {/* Providers */}

            <div
                className={`
                    grid
                    transition-all
                    duration-500
                    ease-out
                    ${open
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                `}
            >
                <div className="overflow-hidden">
                    <div
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/2.5
                            p-6
                        "
                    >
                        {!hasProviders ? (
                            <div
                                className="
                                    flex
                                    min-h-32
                                    items-center
                                    justify-center
                                    text-center
                                "
                            >
                                <div>
                                    <p className="text-sm font-bold text-white/50">
                                        No watch providers found
                                    </p>

                                    <p className="mt-1 text-xs text-white/25">
                                        There are currently no streaming
                                        sources available for this movie.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-7">
                                {/* Free with Ads */}

                                {providers.ads?.length ? (
                                    <ProviderGroup
                                        title="Free with Ads"
                                        providers={
                                            providers.ads
                                        }
                                    />
                                ) : null}

                                {/* Free */}

                                {providers.free?.length ? (
                                    <ProviderGroup
                                        title="Free"
                                        providers={
                                            providers.free
                                        }
                                    />
                                ) : null}

                                {/* Subscription */}

                                {providers.flatrate?.length ? (
                                    <ProviderGroup
                                        title="Subscription"
                                        providers={
                                            providers.flatrate
                                        }
                                    />
                                ) : null}

                                {/* Rent */}

                                {providers.rent?.length ? (
                                    <ProviderGroup
                                        title="Rent"
                                        providers={
                                            providers.rent
                                        }
                                    />
                                ) : null}

                                {/* Buy */}

                                {providers.buy?.length ? (
                                    <ProviderGroup
                                        title="Buy"
                                        providers={
                                            providers.buy
                                        }
                                    />
                                ) : null}

                                {/* TMDB provider link */}

                                {providers.link && (
                                    <a
                                        href={providers.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            text-xs
                                            font-bold
                                            text-(--accent-primary)
                                            transition-opacity
                                            hover:opacity-70
                                        "
                                    >
                                        View all providers
                                        <ArrowIcon />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* -------------------------------------------------------------------------- */
/* Provider Group                                                             */
/* -------------------------------------------------------------------------- */

interface ProviderGroupProps {
    title: string;
    providers: WatchProvider[];
}

const ProviderGroup = ({
    title,
    providers,
}: ProviderGroupProps) => {
    return (
        <div>
            <h3
                className="
                    mb-3
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-white/40
                "
            >
                {title}
            </h3>

            <div className="flex flex-wrap gap-3">
                {providers.map((provider) => (
                    <div
                        key={provider.provider_id}
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            px-3
                            py-2
                            transition-all
                            duration-300
                            hover:border-white/20
                            hover:bg-white/10
                        "
                    >
                        <img
                            src={`${IMAGE_BASE_URL}/w92${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="
                                size-9
                                rounded-lg
                                object-cover
                            "
                            loading="lazy"
                        />

                        <span
                            className="
                                text-sm
                                font-medium
                                text-white
                            "
                        >
                            {provider.provider_name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */


export default WatchProviders;