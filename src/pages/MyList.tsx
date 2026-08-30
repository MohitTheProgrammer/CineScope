
import ShowAllMovies from "./ShowAllMovies";

import useMyList from "../hooks/myList/useMyList";

import MyListEmpty from "../components/myList/MyListEmpty";
import MyListError from "../components/myList/MyListError";
import MyListGroup from "../components/myList/MyListGroup";
import MyListHeader from "../components/myList/MyListHeader";
import MyListSkeleton from "../components/myList/MyListSkeleton";

const MyList = () => {
    const {
        user,
        userLoading,

        movies,

        loading,
        error,

        searchQuery,
        setSearchQuery,

        movieGroups,

        selectedGroup,
        setSelectedGroup,

        reload,
    } = useMyList();

    /* ---------------------------------------------------------------------- */
    /* Auth loading                                                            */
    /* ---------------------------------------------------------------------- */

    if (userLoading) {
        return (
            <main
                className="
                    min-h-screen
                    bg-(--bg-primary)
                "
            />
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Authentication                                                          */
    /* ---------------------------------------------------------------------- */

    if (!user) {
        return (
            <MyListEmpty
                authenticated={false}
            />
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Selected group                                                          */
    /* ---------------------------------------------------------------------- */

    if (selectedGroup) {
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
                    <button
                        type="button"
                        onClick={() =>
                            setSelectedGroup(
                                null
                            )
                        }
                        className="
                            mb-8
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-white/50
                            transition-colors
                            hover:text-(--accent-primary)
                        "
                    >
                        <span aria-hidden="true">
                            ←
                        </span>

                        Back to My List
                    </button>
                </div>

                <ShowAllMovies
                    movielist={
                        selectedGroup.movies
                    }
                    title={
                        selectedGroup.title
                    }
                />
            </main>
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Main page                                                               */
    /* ---------------------------------------------------------------------- */

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
                <MyListHeader
                    searchQuery={
                        searchQuery
                    }
                    onSearchChange={
                        setSearchQuery
                    }
                />

                {/* Loading */}

                {loading && (
                    <MyListSkeleton />
                )}

                {/* Error */}

                {!loading && error && (
                    <MyListError
                        message={error}
                        onRetry={() =>
                            void reload()
                        }
                    />
                )}

                {/* No saved movies */}

                {!loading &&
                    !error &&
                    movies.length === 0 && (
                        <MyListEmpty
                            authenticated={
                                true
                            }
                        />
                    )}

                {/* Search produced no results */}

                {!loading &&
                    !error &&
                    movies.length > 0 &&
                    movieGroups.length === 0 && (
                        <MyListEmpty
                            authenticated={
                                true
                            }
                            searchQuery={
                                searchQuery
                            }
                        />
                    )}

                {/* Movie groups */}

                {!loading &&
                    !error &&
                    movieGroups.length > 0 && (
                        <div
                            className="
                                mt-12
                                space-y-16
                            "
                        >
                            {movieGroups.map(
                                (group) => (
                                    <MyListGroup
                                        key={
                                            group.title
                                        }
                                        group={
                                            group
                                        }
                                        onViewAll={() =>
                                            setSelectedGroup(
                                                group
                                            )
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
            </div>
        </main>
    );
};

export default MyList;