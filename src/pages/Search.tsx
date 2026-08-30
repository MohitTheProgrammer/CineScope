import { useSearchParams } from "react-router-dom";

import useMovieSearch from "../hooks/search/useMovieSearch";

import SearchHeader from "../components/search/SearchHeader";
import SearchError from "../components/search/SearchError";
import MovieResults from "../components/search/MovieResults";
import EmptySearch from "../components/search/EmptySearch";
import SearchSkeleton from "../components/search/SearchSkeleton";

const Search = () => {
    const [searchParams] =
        useSearchParams();

    const query =
        searchParams
            .get("query")
            ?.trim() ?? "";

    const {
        movies,
        loading,
        error,
        retry,
    } = useMovieSearch(query);

    return (
        <main
            className="
                min-h-screen
                bg-(--bg-primary)
                px-6
                pb-20
                pt-32
                lg:px-8
            "
        >
            <div className="mx-auto max-w-7xl">
                <SearchHeader
                    query={query}
                />

                {loading && (
                    <SearchSkeleton />
                )}

                {!loading && error && (
                    <SearchError
                        message={error}
                        onRetry={retry}
                    />
                )}

                {!loading &&
                    !error &&
                    movies.length > 0 && (
                        <MovieResults
                            movies={movies}
                        />
                    )}

                {!loading &&
                    !error &&
                    query &&
                    movies.length === 0 && (
                        <EmptySearch
                            query={query}
                        />
                    )}
            </div>
        </main>
    );
};

export default Search;