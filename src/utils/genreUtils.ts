import {
    FlameIcon,
    EyeIcon,
    RocketIcon,
    FilmIcon,
    SparklesIcon,
    BrainIcon,
    TargetIcon,
} from "../assets/icons/Icons";

export type IconComponent =
    React.ComponentType<{
        className?: string;
    }>;

export interface GenreInfo {
    id: number;
    name: string;
    icon: IconComponent;
}

export const GENRE_INFO: GenreInfo[] = [
    {
        id: 28,
        name: "Action",
        icon: FlameIcon,
    },
    {
        id: 12,
        name: "Adventure",
        icon: RocketIcon,
    },
    {
        id: 16,
        name: "Animation",
        icon: SparklesIcon,
    },
    {
        id: 35,
        name: "Comedy",
        icon: SparklesIcon,
    },
    {
        id: 80,
        name: "Crime",
        icon: TargetIcon,
    },
    {
        id: 99,
        name: "Documentary",
        icon: FilmIcon,
    },
    {
        id: 18,
        name: "Drama",
        icon: BrainIcon,
    },
    {
        id: 10751,
        name: "Family",
        icon: SparklesIcon,
    },
    {
        id: 14,
        name: "Fantasy",
        icon: SparklesIcon,
    },
    {
        id: 36,
        name: "History",
        icon: FilmIcon,
    },
    {
        id: 27,
        name: "Horror",
        icon: TargetIcon,
    },
    {
        id: 10402,
        name: "Music",
        icon: SparklesIcon,
    },
    {
        id: 9648,
        name: "Mystery",
        icon: EyeIcon,
    },
    {
        id: 10749,
        name: "Romance",
        icon: SparklesIcon,
    },
    {
        id: 878,
        name: "Sci-Fi",
        icon: RocketIcon,
    },
    {
        id: 53,
        name: "Thriller",
        icon: TargetIcon,
    },
    {
        id: 10752,
        name: "War",
        icon: TargetIcon,
    },
    {
        id: 37,
        name: "Western",
        icon: FilmIcon,
    },
];

export const getGenreInfo = (
    genreId: number
): GenreInfo => {
    return (
        GENRE_INFO.find(
            (genre) =>
                genre.id === genreId
        ) ?? {
            id: genreId,
            name: `Genre ${genreId}`,
            icon: FilmIcon,
        }
    );
};

export const getGenreDescription = (
    rank: number,
    score: number,
    totalScore: number
): string => {
    if (rank === 1) {
        return "Your strongest genre";
    }

    if (score >= totalScore * 0.2) {
        return "A major part of your taste";
    }

    if (score >= totalScore * 0.1) {
        return "You come back to this";
    }

    return "Part of your movie DNA";
};