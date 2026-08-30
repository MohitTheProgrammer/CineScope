import {
    FlameIcon,
    SearchIcon,
    SparklesIcon,
    RocketIcon,
    TargetIcon,
} from "../assets/icons/Icons";

export interface HowItWorksGenre {
    name: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    percentage: number;
    color: string;
}

export const HOW_IT_WORKS_GENRES: HowItWorksGenre[] = [
    {
        name: "Action",
        icon: FlameIcon,
        percentage: 42,
        color: "bg-orange-400",
    },
    {
        name: "Mystery",
        icon: SearchIcon,
        percentage: 23,
        color: "bg-violet-400",
    },
    {
        name: "Comedy",
        icon: SparklesIcon,
        percentage: 16,
        color: "bg-yellow-400",
    },
    {
        name: "Sci-Fi",
        icon: RocketIcon,
        percentage: 12,
        color: "bg-cyan-400",
    },
    {
        name: "Thriller",
        icon: TargetIcon,
        percentage: 7,
        color: "bg-rose-400",
    },
];

export const MOVIE_INGREDIENTS = [
    {
        genre: "Action",
        icon: FlameIcon,
    },
    {
        genre: "Mystery",
        icon: SearchIcon,
    },
    {
        genre: "Comedy",
        icon: SparklesIcon,
    },
];

export const DNA_SIGNALS = [
    {
        label: "Likes",
    },
    {
        label: "Patterns",
    },
    {
        label: "Ratings",
    },
];