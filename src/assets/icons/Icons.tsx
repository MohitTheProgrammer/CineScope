import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaultProps: IconProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    className: "size-5",
    "aria-hidden": true,
};

/* -------------------------------------------------------------------------- */
/* Film                                                                       */
/* -------------------------------------------------------------------------- */

export const FilmIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M8 4v5" />
        <path d="M16 4v5" />
        <path d="M8 15v5" />
        <path d="M16 15v5" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Heart                                                                      */
/* -------------------------------------------------------------------------- */

export const HeartIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M20.84 8.61a5.5 5.5 0 0 0-7.78-7.78L12 1.9l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78L12 21.23Z" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Target                                                                     */
/* -------------------------------------------------------------------------- */

export const TargetIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <path d="M12 3V1" />
        <path d="M12 23v-2" />
        <path d="M3 12H1" />
        <path d="M23 12h-2" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* DNA / Movie DNA                                                            */
/* -------------------------------------------------------------------------- */

export const DnaIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M7 3c5 0 10 3 10 8s-5 8-10 8" />
        <path d="M17 3C12 3 7 6 7 11s5 8 10 8" />
        <path d="M8.5 6h7" />
        <path d="M7 10h10" />
        <path d="M7 14h10" />
        <path d="M8.5 18h7" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Star                                                                       */
/* -------------------------------------------------------------------------- */

export const StarIcon = (props: IconProps) => (
    <svg
        {...defaultProps}
        {...props}
        fill={props.fill ?? "currentColor"}
        stroke={props.stroke ?? "none"}
    >
        <path d="m12 3 2.78 5.63 6.22.9-4.5 4.38 1.06 6.2L12 17.18 6.44 20.1l1.06-6.2L3 9.53l6.22-.9L12 3Z" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Flame                                                                      */
/* -------------------------------------------------------------------------- */

export const FlameIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M12 22c4.42 0 8-3.13 8-7.4 0-3.25-1.72-5.92-4.55-8.6.1 2.15-.45 3.55-1.45 4.55-.25-3.75-2.45-6.7-5.45-8.55.25 3.55-2.55 5.7-2.55 9.25C6 18.42 8.69 22 12 22Z" />
        <path d="M12 22c-1.93 0-3.5-1.58-3.5-3.52 0-1.43.77-2.65 2.15-3.98.06 1.05.42 1.82 1.1 2.4.5-.83.7-1.72.62-2.8 1.38 1.13 2.13 2.58 2.13 4.1A3.5 3.5 0 0 1 12 22Z" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Eye                                                                        */
/* -------------------------------------------------------------------------- */

export const EyeIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Palette                                                                    */
/* -------------------------------------------------------------------------- */

export const PaletteIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M12 3a9 9 0 0 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h4.5a4.5 4.5 0 0 0 0-9H12Z" />
        <circle cx="7.5" cy="10" r=".8" fill="currentColor" />
        <circle cx="10" cy="7" r=".8" fill="currentColor" />
        <circle cx="14" cy="7" r=".8" fill="currentColor" />
        <circle cx="17" cy="10" r=".8" fill="currentColor" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Brain / Algorithm                                                          */
/* -------------------------------------------------------------------------- */

export const BrainIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M9.5 4.5A3.5 3.5 0 0 0 6 8c0 .45.08.87.23 1.26A3.5 3.5 0 0 0 7.5 16c.36 0 .7-.05 1.02-.15A3.5 3.5 0 0 0 12 19.5V5.5a3.5 3.5 0 0 0-2.5-1Z" />
        <path d="M14.5 4.5A3.5 3.5 0 0 1 18 8c0 .45-.08.87-.23 1.26A3.5 3.5 0 0 1 16.5 16c-.36 0-.7-.05-1.02-.15A3.5 3.5 0 0 1 12 19.5V5.5a3.5 3.5 0 0 1 2.5-1Z" />
        <path d="M6 9.5h2" />
        <path d="M16 9.5h2" />
        <path d="M8 13h2" />
        <path d="M14 13h2" />
        <path d="M12 7v3" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Sparkles                                                                   */
/* -------------------------------------------------------------------------- */

export const SparklesIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="m12 3-1.1 3.9L7 8l3.9 1.1L12 13l1.1-3.9L17 8l-3.9-1.1L12 3Z" />
        <path d="m19 13-.65 2.35L16 16l2.35.65L19 19l.65-2.35L22 16l-2.35-.65L19 13Z" />
        <path d="m5 15-.7 2.3L2 18l2.3.7L5 21l.7-2.3L8 18l-2.3-.7L5 15Z" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Chart                                                                      */
/* -------------------------------------------------------------------------- */

export const ChartIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 3-4 3 2 5-6" />
        <path d="M18 7h-3" />
        <path d="M18 7v3" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Users                                                                      */
/* -------------------------------------------------------------------------- */

export const UsersIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.31 2.69-6 6-6s6 2.69 6 6" />
        <path d="M16 5.5a3 3 0 0 1 0 5.8" />
        <path d="M18 14.2a5.5 5.5 0 0 1 3 4.8" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Check                                                                      */
/* -------------------------------------------------------------------------- */

export const CheckIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="m5 12 4 4L19 6" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Arrow Right                                                                */
/* -------------------------------------------------------------------------- */

export const ArrowRightIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Arrow Left                                                                 */
/* -------------------------------------------------------------------------- */

export const ArrowLeftIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Play                                                                       */
/* -------------------------------------------------------------------------- */

export const PlayIcon = (props: IconProps) => (
    <svg
        {...defaultProps}
        {...props}
        fill={props.fill ?? "currentColor"}
        stroke={props.stroke ?? "none"}
    >
        <path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l10.3-6.86a1 1 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Plus                                                                       */
/* -------------------------------------------------------------------------- */

export const PlusIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */

export const SearchIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Lock                                                                       */
/* -------------------------------------------------------------------------- */

export const LockIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* User                                                                       */
/* -------------------------------------------------------------------------- */

export const UserIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Clock                                                                      */
/* -------------------------------------------------------------------------- */

export const ClockIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Film Reel                                                                  */
/* -------------------------------------------------------------------------- */

export const FilmReelIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="6" r="1.5" />
        <circle cx="17.2" cy="9" r="1.5" />
        <circle cx="17.2" cy="15" r="1.5" />
        <circle cx="12" cy="18" r="1.5" />
        <circle cx="6.8" cy="15" r="1.5" />
        <circle cx="6.8" cy="9" r="1.5" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Sliders / Preferences                                                      */
/* -------------------------------------------------------------------------- */

export const SlidersIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
        <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
        <circle cx="11" cy="18" r="2" fill="currentColor" stroke="none" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Lightbulb / Insight                                                         */
/* -------------------------------------------------------------------------- */

export const LightbulbIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M8.5 15.5A6 6 0 1 1 15.5 15c-.9.65-1.5 1.45-1.5 2.5h-4c0-1.05-.6-1.85-1.5-2.5Z" />
        <path d="M12 2v1" />
        <path d="m4.2 4.2.7.7" />
        <path d="m19.8 4.2-.7.7" />
    </svg>
);

/* -------------------------------------------------------------------------- */
/* Rocket Icon / Insight                                                         */
/* -------------------------------------------------------------------------- */

export const RocketIcon = (props: IconProps) => (
    <svg {...defaultProps} {...props}>
        <path d="M14 4c2.5-1.5 5.5-1.5 6-1 .5.5.5 3.5-1 6l-5.5 5.5-4-4L14 4Z" />
        <path d="m9.5 10.5-4 1-2 3 4.5-.5" />
        <path d="m13.5 14.5-1 4-3 2 .5-4.5" />
        <circle cx="16.5" cy="7.5" r="1.5" />
        <path d="M8.5 15.5 5 19" />
    </svg>
);

export const ArrowIcon = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
        >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
        </svg>
    );
};

export const LoadingIcon = (props: IconProps) => (
    <svg
        {...defaultProps}
        {...props}
        className={`animate-spin ${props.className ?? "size-4"}`}
    >
        <circle
            cx="12"
            cy="12"
            r="9"
            className="opacity-25"
        />

        <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
);

export const ProviderIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5"
        aria-hidden="true"
    >
        <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
        />

        <path d="M7 8h10" />
        <path d="M7 12h6" />
        <path d="M7 16h4" />
    </svg>
);

export const ChevronIcon = ({
    open,
}: {
    open: boolean;
}) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
            size-5
            shrink-0
            text-white/35
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
        `}
        aria-hidden="true"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
    <svg
        {...defaultProps}
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);
