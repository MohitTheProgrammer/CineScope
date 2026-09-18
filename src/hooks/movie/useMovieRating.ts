import { useEffect, useState } from "react";

import { rateMovie, getMovieRating } from "../../services/movie";

import { useUser } from "../../context/UserContext";

import type { Movie } from "../../types/movie";

interface UseMovieRatingResult {
  rated: boolean;
  userRating: number | null;
  checkingRated: boolean;
  savingRating: boolean;
  ratingOpen: boolean;
  toggleRating: () => void;
  rate: (rating: number) => Promise<void>;
}

export const useMovieRating = (movie: Movie | null): UseMovieRatingResult => {
  const { user } = useUser();

  const [rated, setRated] = useState(false);

  const [userRating, setUserRating] = useState<number | null>(null);

  const [checkingRated, setCheckingRated] = useState(true);

  const [savingRating, setSavingRating] = useState(false);

  const [ratingOpen, setRatingOpen] = useState(false);

  /*
   * Check whether the current user has
   * already rated this movie.
   *
   * New structure:
   *
   * users/{uid}
   *     rated: {
   *         "{movieId}": {
   *             rated: true,
   *             rating: 4.5
   *         }
   *     }
   */
  useEffect(() => {
    let cancelled = false;

    const checkRating = async () => {
      if (!user || !movie) {
        setRated(false);
        setUserRating(null);
        setCheckingRated(false);
        return;
      }

      try {
        setCheckingRated(true);

        const rating = await getMovieRating(user.uid, movie.id);
        console.log({ rating });

        if (!cancelled) {
          setUserRating(rating);
          setRated(rating !== null);

          console.log(
            `[useMovieRating] Rating state loaded: ${movie.id} -> ${rating}`,
          );
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            `[useMovieRating] Failed to check rating: ${movie.id}`,
            error,
          );

          setRated(false);
          setUserRating(null);
        }
      } finally {
        if (!cancelled) {
          setCheckingRated(false);
        }
      }
    };

    void checkRating();

    return () => {
      cancelled = true;
    };
  }, [user, movie]);

  /*
   * Open/close rating selector.
   *
   * Once a movie has been rated,
   * rating cannot be opened again.
   */
  const toggleRating = () => {
    if (rated || savingRating) {
      return;
    }

    setRatingOpen((current) => !current);
  };

  /*
   * Rate movie.
   *
   * rateMovie() is responsible for:
   *
   * 1. Creating/updating movies/{movieId}
   *    with the complete movie object.
   *
   * 2. Updating users/{uid}.rated.{movieId}
   *    with the user's rating.
   */
  const rate = async (rating: number) => {
    if (!user || !movie || rated || savingRating) {
      return;
    }

    try {
      setSavingRating(true);

      const genreIds = movie.genre_ids?.length
        ? movie.genre_ids
        : (movie.genres?.map((genre) => genre.id) ?? []);

      console.log("[useMovieRating] Rating movie:", {
        movieId: movie.id,
        title: movie.title,
        rating,
        overview: movie.overview ?? "",
        genreIds,
      });

      await rateMovie(
        user.uid,
        {
          id: movie.id,

          title: movie.title,

          overview: movie.overview ?? "",

          poster_path: movie.poster_path ?? null,

          genre_ids: genreIds,

          vote_average: movie.vote_average ?? 0,
        },
        rating,
      );

      setUserRating(rating);
      setRated(true);
      setRatingOpen(false);

      console.log(
        `[useMovieRating] Movie rated successfully: ${movie.id} -> ${rating}`,
      );
    } catch (error) {
      console.error(
        `[useMovieRating] Failed to rate movie: ${movie.id}`,
        error,
      );
    } finally {
      setSavingRating(false);
    }
  };

  return {
    rated,
    userRating,
    checkingRated,
    savingRating,
    ratingOpen,
    toggleRating,
    rate,
  };
};

export default useMovieRating;
