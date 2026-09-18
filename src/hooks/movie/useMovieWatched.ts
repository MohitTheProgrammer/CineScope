import { useEffect, useState } from "react";

import { addWatchedMovie, isMovieWatched } from "../../services/movie";

import { useUser } from "../../context/UserContext";

import type { Movie } from "../../types/movie";

interface UseMovieWatchedResult {
  watched: boolean;
  checkingWatched: boolean;
  addingWatched: boolean;
  addWatched: () => Promise<void>;
}

export const useMovieWatched = (movie: Movie | null): UseMovieWatchedResult => {
  const { user } = useUser();

  const [watched, setWatched] = useState(false);

  const [checkingWatched, setCheckingWatched] = useState(true);

  const [addingWatched, setAddingWatched] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkWatched = async () => {
      if (!user || !movie) {
        setWatched(false);
        setCheckingWatched(false);
        return;
      }

      try {
        setCheckingWatched(true);

        const exists = await isMovieWatched(user.uid, movie.id);

        if (cancelled) {
          return;
        }

        setWatched(exists);

        console.log(
          `[useMovieWatched] Watched state loaded: ${movie.id} -> ${exists}`,
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          `[useMovieWatched] Failed to check watched state: ${movie.id}`,
          error,
        );

        setWatched(false);
      } finally {
        if (!cancelled) {
          setCheckingWatched(false);
        }
      }
    };

    void checkWatched();

    return () => {
      cancelled = true;
    };
  }, [user, movie]);

  const addWatched = async () => {
    if (!user || !movie || watched || addingWatched) {
      return;
    }

    try {
      setAddingWatched(true);

      /*
       * Make sure we use the actual movie data.
       */

      const genreIds = movie.genre_ids?.length
        ? movie.genre_ids
        : (movie.genres?.map((genre) => genre.id) ?? []);
      const movieData = {
        id: movie.id,

        title: movie.title,

        overview: movie.overview ?? "",

        poster_path: movie.poster_path ?? null,

        genre_ids: genreIds,

        vote_average:
          typeof movie.vote_average === "number" ? movie.vote_average : 0,
      };

      console.log("[useMovieWatched] Movie data being saved:", movieData);

      await addWatchedMovie(user.uid, movieData);

      setWatched(true);

      console.log(
        `[useMovieWatched] Movie added to watched successfully: ${movie.id}`,
      );
    } catch (error) {
      console.error(
        `[useMovieWatched] Failed to add movie to watched: ${movie.id}`,
        error,
      );
    } finally {
      setAddingWatched(false);
    }
  };

  return {
    watched,
    checkingWatched,
    addingWatched,
    addWatched,
  };
};

export default useMovieWatched;
