import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";
import { getPopularMovies } from "../services/tmdb";

interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

const Trending = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageParam = Number(searchParams.get("page")) || 1;

    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(pageParam);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                setError(null);

                const data: MoviesResponse = await getPopularMovies(
                    currentPage
                );

                setMovies(data.results);
                setTotalPages(Math.min(data.total_pages, 500));
                console.log(data.total_pages)
            } catch (error) {
                console.error(
                    "Failed to load trending movies:",
                    error
                );

                setError(
                    "Unable to load trending movies right now."
                );
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [currentPage]);

    /* ---------------------------------------------------------------------- */
    /* Pagination                                                             */
    /* ---------------------------------------------------------------------- */

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) {
            return;
        }

        setCurrentPage(page);

        setSearchParams({
            page: String(page),
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;
        }

        pages.push(1);

        if (currentPage > 4) {
            pages.push("...");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(
            totalPages - 1,
            currentPage + 1
        );

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) {
            pages.push("...");
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <main className="min-h-screen bg-(--bg-primary)">
            {/* ---------------------------------------------------------------- */}
            {/* Header                                                           */}
            {/* ---------------------------------------------------------------- */}

            <section
                className="
                    relative
                    overflow-hidden
                    border-b
                    border-white/5
                    px-6
                    pb-14
                    pt-32
                    lg:px-8
                "
            >
                {/* Background glow */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-40
                        -top-40
                        size-96
                        rounded-full
                        bg-(--accent-primary)/10
                        blur-[120px]
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -left-40
                        bottom-0
                        size-80
                        rounded-full
                        bg-(--accent-secondary)/5
                        blur-[100px]
                    "
                />

                <div className="relative mx-auto max-w-7xl">
                    {/* Eyebrow */}
                    <div className="mb-4 flex items-center gap-3">
                        <span
                            className="
                                h-px
                                w-8
                                bg-(--accent-primary)
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.3em]
                                text-(--accent-primary)
                            "
                        >
                            Discover
                        </span>
                    </div>

                    {/* Heading */}
                    <h1
                        className="
                            text-4xl
                            font-black
                            tracking-tight
                            text-white
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        Trending{" "}
                        <span className="text-(--accent-primary)">
                            Movies
                        </span>
                    </h1>

                    <p
                        className="
                            mt-4
                            max-w-xl
                            text-sm
                            leading-6
                            text-white/50
                            sm:text-base
                        "
                    >
                        See what everyone is watching right now.
                        Explore popular movies and discover
                        something worth adding to your list.
                    </p>

                    {/* Results count */}
                    {!loading && !error && (
                        <p
                            className="
                                mt-6
                                text-xs
                                font-medium
                                text-white/30
                            "
                        >
                            Showing page {currentPage} of{" "}
                            {totalPages}
                        </p>
                    )}
                </div>
            </section>

            {/* ---------------------------------------------------------------- */}
            {/* Movies                                                           */}
            {/* ---------------------------------------------------------------- */}

            <section
                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    py-12
                    lg:px-8
                "
            >
                {/* Loading */}
                {loading && <MovieGridSkeleton />}

                {/* Error */}
                {!loading && error && (
                    <ErrorState
                        message={error}
                        onRetry={() => {
                            setCurrentPage(currentPage);
                        }}
                    />
                )}

                {/* Movies */}
                {!loading && !error && movies.length > 0 && (
                    <>
                        <div
                            className="
        grid
        grid-cols-2
        gap-x-5
        gap-y-10
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
    "
                        >
                            {movies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    {...movie}
                                    orientation="vertical"
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pages={getPageNumbers()}
                            onPageChange={changePage}
                        />
                    </>
                )}

                {/* Empty */}
                {!loading &&
                    !error &&
                    movies.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-sm text-white/50">
                                No movies found.
                            </p>
                        </div>
                    )}
            </section>
        </main>
    );
};

export default Trending;

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pages: (number | string)[];
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    pages,
    onPageChange,
}: PaginationProps) => {
    return (
        <nav
            aria-label="Movie pagination"
            className="
                mt-16
                flex
                flex-wrap
                items-center
                justify-center
                gap-2
            "
        >
            {/* Previous */}
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-white/60
                    transition-all
                    duration-300
                    hover:border-(--accent-primary)
                    hover:bg-(--accent-primary)
                    hover:text-white
                    disabled:pointer-events-none
                    disabled:opacity-25
                "
                aria-label="Previous page"
            >
                <ChevronLeftIcon />
            </button>

            {/* Pages */}
            <div className="flex items-center gap-2">
                {pages.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="
                                    flex
                                    size-10
                                    items-center
                                    justify-center
                                    text-xs
                                    text-white/30
                                "
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive =
                        page === currentPage;

                    return (
                        <button
                            key={page}
                            type="button"
                            onClick={() =>
                                onPageChange(page as number)
                            }
                            className={`
                                flex
                                size-10
                                items-center
                                justify-center
                                rounded-full
                                border
                                text-xs
                                font-bold
                                transition-all
                                duration-300
                                ${isActive
                                    ? `
                                            border-(--accent-primary)
                                            bg-(--accent-primary)
                                            text-white
                                            shadow-[0_0_20px_var(--accent-glow)]
                                          `
                                    : `
                                            border-white/10
                                            bg-white/5
                                            text-white/50
                                            hover:border-white/20
                                            hover:bg-white/10
                                            hover:text-white
                                          `
                                }
                            `}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next */}
            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="
                    flex
                    size-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-white/60
                    transition-all
                    duration-300
                    hover:border-(--accent-primary)
                    hover:bg-(--accent-primary)
                    hover:text-white
                    disabled:pointer-events-none
                    disabled:opacity-25
                "
                aria-label="Next page"
            >
                <ChevronRightIcon />
            </button>
        </nav>
    );
};

/* -------------------------------------------------------------------------- */
/* Skeleton                                                                   */
/* -------------------------------------------------------------------------- */

const MovieGridSkeleton = () => {
    return (
        <div
            className="
                grid
                grid-cols-2
                gap-x-4
                gap-y-8
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
            "
        >
            {Array.from({ length: 18 }).map(
                (_, index) => (
                    <div
                        key={index}
                        className="min-w-0"
                    >
                        <div
                            className="
                                aspect-2/3
                                animate-pulse
                                rounded-2xl
                                bg-white/5
                            "
                        />

                        <div
                            className="
                                mt-3
                                h-3
                                w-3/4
                                animate-pulse
                                rounded
                                bg-white/5
                            "
                        />

                        <div
                            className="
                                mt-2
                                h-2
                                w-1/2
                                animate-pulse
                                rounded
                                bg-white/5
                            "
                        />
                    </div>
                )
            )}
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/* Error                                                                      */
/* -------------------------------------------------------------------------- */

interface ErrorStateProps {
    message: string;
    onRetry: () => void;
}

const ErrorState = ({
    message,
    onRetry,
}: ErrorStateProps) => {
    return (
        <div
            className="
                mx-auto
                max-w-md
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-10
                text-center
            "
        >
            <div
                className="
                    mx-auto
                    flex
                    size-12
                    items-center
                    justify-center
                    rounded-full
                    bg-(--accent-primary)/10
                    text-(--accent-primary)
                "
            >
                !
            </div>

            <p className="mt-4 text-sm text-white/60">
                {message}
            </p>

            <button
                type="button"
                onClick={onRetry}
                className="
                    mt-5
                    rounded-full
                    bg-(--accent-primary)
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    text-white
                    transition-all
                    hover:scale-105
                "
            >
                Try again
            </button>
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

const ChevronLeftIcon = () => (
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
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRightIcon = () => (
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
        <path d="m9 18 6-6-6-6" />
    </svg>
);