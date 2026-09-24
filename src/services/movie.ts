import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../services/firebase";

/* Error boundaries below preserve the intentional fallback values used by callers. */
/* eslint-disable no-useless-catch */

interface Movie {
  id: number;
  title: string;
  overview?: string | null;
  poster_path: string | null;
  genre_ids: number[];
  vote_average: number;
}

export interface GlobalMovie {
  movieId: number;
  title: string;
  movieSynopsis: string;
  posterPath: string | null;
  genreIds: number[];
  voteAverage: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

/* =========================================================
   GLOBAL MOVIE
   ========================================================= */
const createOrUpdateGlobalMovie = async (movie: Movie): Promise<void> => {
  try {
    const movieRef = doc(db, "movies", String(movie.id));

    const snapshot = await getDoc(movieRef);

    const movieData = {
      movieId: movie.id,
      title: movie.title ?? "",
      movieSynopsis: movie.overview ?? "",
      posterPath: movie.poster_path ?? null,
      genreIds: movie.genre_ids ?? [],
      voteAverage: movie.vote_average ?? 0,
      updatedAt: serverTimestamp(),
    };

    if (snapshot.exists()) {
      await updateDoc(movieRef, movieData);

    } else {
      await setDoc(movieRef, {
        ...movieData,
        createdAt: serverTimestamp(),
      });

    }
  } catch (error) {
    throw error;
  }
};

export const getMovieRating = async (
  uid: string,
  movieId: number,
): Promise<number | null> => {
  try {
    const userRef = doc(db, "users", uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();

    const rated = data.rated ?? {};

    const storedRating = rated[String(movieId)];

    // Ratings are stored as `{ [movieId]: number }`. Accept the previous
    // nested shape as well so users with older data do not lose their rating.
    const movieRating =
      typeof storedRating === "number"
        ? storedRating
        : storedRating &&
            typeof storedRating === "object" &&
            "rated" in storedRating &&
            "rating" in storedRating &&
            storedRating.rated === true &&
            typeof storedRating.rating === "number"
          ? storedRating.rating
          : null;

    if (movieRating === null || !Number.isFinite(movieRating)) {
      return null;
    }

    return movieRating;
  } catch {
    return null;
  }
};

/* =========================================================
   LIKE
   ========================================================= */

export const addLikedMovie = async (
  uid: string,
  movie: Movie,
): Promise<void> => {
  try {
    await createOrUpdateGlobalMovie(movie);

    const userRef = doc(db, "users", uid);

    await setDoc(
      userRef,
      {
        liked: arrayUnion(movie.id),
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      },
    );

  } catch (error) {
    throw error;
  }
};

/* =========================================================
   REMOVE LIKE
   ========================================================= */

export const removeLikedMovie = async (
  uid: string,
  movieId: number,
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      liked: arrayRemove(movieId),
      updatedAt: serverTimestamp(),
    });

  } catch (error) {
    throw error;
  }
};

export const isMovieLiked = async (
  uid: string,
  movieId: number,
): Promise<boolean> => {
  try {
    const snapshot = await getDoc(doc(db, "users", uid));

    if (!snapshot.exists()) {
      return false;
    }

    const liked = snapshot.data().liked;

    return Array.isArray(liked) && liked.includes(movieId);
  } catch {
    return false;
  }
};

/* =========================================================
   WATCHLIST
   ========================================================= */

export const addWatchlistMovie = async (
  uid: string,
  movie: Movie,
): Promise<void> => {
  try {
    await createOrUpdateGlobalMovie(movie);

    const userRef = doc(db, "users", uid);

    await setDoc(
      userRef,
      {
        watchlist: arrayUnion(movie.id),
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      },
    );

  } catch (error) {
    throw error;
  }
};

/* =========================================================
   REMOVE WATCHLIST
   ========================================================= */

export const removeWatchlistMovie = async (
  uid: string,
  movieId: number,
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      watchlist: arrayRemove(movieId),
      updatedAt: serverTimestamp(),
    });

  } catch (error) {
    throw error;
  }
};

export const isMovieInWatchlist = async (
  uid: string,
  movieId: number,
): Promise<boolean> => {
  try {
    const userRef = doc(db, "users", uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      return false;
    }

    const data = snapshot.data();

    const watchlist = data.watchlist ?? [];

    const exists = watchlist.includes(movieId);

    return exists;
  } catch {
    return false;
  }
};

/* =========================================================
   WATCHED
   ========================================================= */

export const addWatchedMovie = async (
  uid: string,
  movie: Movie,
): Promise<void> => {
  try {
    await createOrUpdateGlobalMovie(movie);

    const userRef = doc(db, "users", uid);

    await setDoc(
      userRef,
      {
        watched: arrayUnion(movie.id),
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      },
    );

  } catch (error) {
    throw error;
  }
};

export const isMovieWatched = async (
  uid: string,
  movieId: number,
): Promise<boolean> => {
  try {
    const userRef = doc(db, "users", uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      return false;
    }

    const data = snapshot.data();

    const watched = Array.isArray(data.watched) ? data.watched : [];

    const exists = watched.includes(movieId);

    return exists;
  } catch (error) {
    throw error;
  }
};

/* =========================================================
   RATING
   ========================================================= */

export const rateMovie = async (
  uid: string,
  movie: Movie,
  rating: number,
): Promise<void> => {
  try {
    await createOrUpdateGlobalMovie(movie);

    const userRef = doc(db, "users", uid);

    await setDoc(
      userRef,
      {
        rated: {
          [String(movie.id)]: rating,
        },
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      },
    );

  } catch (error) {
    throw error;
  }
};

/* =========================================================
   GET GLOBAL MOVIE
   ========================================================= */

export const getGlobalMovie = async (
  movieId: number,
): Promise<GlobalMovie | null> => {
  try {
    const movieRef = doc(db, "movies", String(movieId));

    const snapshot = await getDoc(movieRef);

    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();

    return {
      movieId: data.movieId,
      title: data.title ?? "",
      movieSynopsis: data.movieSynopsis ?? "",
      posterPath: data.posterPath ?? null,
      genreIds: data.genreIds ?? [],
      voteAverage: data.voteAverage ?? 0,
      createdAt: data.createdAt ?? null,
      updatedAt: data.updatedAt ?? null,
    };
  } catch (error) {
    throw error;
  }
};

/* =========================================================
   USER MOVIE INTERACTION STATE
   ========================================================= */

export interface UserMovieState {
  liked: boolean;
  watched: boolean;
  watchlisted: boolean;
  rated: boolean;
  rating: number | null;
}

export const getUserMovieState = async (
  uid: string,
  movieId: number,
): Promise<UserMovieState> => {
  try {
    const userRef = doc(db, "users", uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      return {
        liked: false,
        watched: false,
        watchlisted: false,
        rated: false,
        rating: null,
      };
    }

    const data = snapshot.data();

    const liked = Array.isArray(data.liked) && data.liked.includes(movieId);

    const watched =
      Array.isArray(data.watched) && data.watched.includes(movieId);

    const watchlisted =
      Array.isArray(data.watchlist) && data.watchlist.includes(movieId);

    const storedRating =
      data.rated &&
      typeof data.rated === "object"
        ? data.rated[String(movieId)]
        : undefined;
    const rating = normalizeRating(storedRating);

    const result = {
      liked,
      watched,
      watchlisted,
      rated: rating !== null,
      rating,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

const normalizeRating = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (
    value &&
    typeof value === "object" &&
    "rated" in value &&
    "rating" in value &&
    value.rated === true &&
    typeof value.rating === "number" &&
    Number.isFinite(value.rating)
  ) {
    return value.rating;
  }

  return null;
};

/* =========================================================
   GET USER LIKED MOVIES
   ========================================================= */

export const getLikedMovies = async (uid: string): Promise<GlobalMovie[]> => {
  try {
    const userRef = doc(db, "users", uid);

    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return [];
    }

    const data = userSnapshot.data();

    const movieIds: number[] = Array.isArray(data.liked)
      ? data.liked.filter((id: unknown): id is number => typeof id === "number")
      : [];

    const movies = await Promise.all(
      movieIds.map((movieId) => getGlobalMovie(movieId)),
    );

    const result = movies.filter(
      (movie): movie is GlobalMovie => movie !== null,
    );

    return result;
  } catch (error) {
    throw error;
  }
};

/* =========================================================
   GET USER WATCHLIST
   ========================================================= */

export const getWatchlistMovies = async (
  uid: string,
): Promise<GlobalMovie[]> => {
  try {
    const userRef = doc(db, "users", uid);

    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return [];
    }

    const data = userSnapshot.data();

    const movieIds: number[] = Array.isArray(data.watchlist)
      ? data.watchlist.filter(
          (id: unknown): id is number => typeof id === "number",
        )
      : [];

    const movies = await Promise.all(
      movieIds.map((movieId) => getGlobalMovie(movieId)),
    );

    const result = movies.filter(
      (movie): movie is GlobalMovie => movie !== null,
    );

    return result;
  } catch (error) {
    throw error;
  }
};

/* =========================================================
   GET USER WATCHED MOVIES
   ========================================================= */

export const getWatchedMovies = async (uid: string): Promise<GlobalMovie[]> => {
  try {
    const userRef = doc(db, "users", uid);

    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      return [];
    }

    const data = userSnapshot.data();

    const movieIds: number[] = Array.isArray(data.watched)
      ? data.watched.filter(
          (id: unknown): id is number => typeof id === "number",
        )
      : [];

    const movies = await Promise.all(
      movieIds.map((movieId) => getGlobalMovie(movieId)),
    );

    const result = movies.filter(
      (movie): movie is GlobalMovie => movie !== null,
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export const getMoviesByIds = async (
  movieIds: number[],
): Promise<GlobalMovie[]> => {
  if (movieIds.length === 0) {
    return [];
  }

  try {
    const uniqueIds = [
      ...new Set(
        movieIds.filter(
          (id): id is number => typeof id === "number" && Number.isInteger(id),
        ),
      ),
    ];

    if (uniqueIds.length === 0) {
      return [];
    }

    const moviesRef = collection(db, "movies");

    const chunks: number[][] = [];

    for (let i = 0; i < uniqueIds.length; i += 30) {
      chunks.push(uniqueIds.slice(i, i + 30));
    }

    const results: GlobalMovie[] = [];

    for (const chunk of chunks) {
      const snapshot = await getDocs(
        query(moviesRef, where("movieId", "in", chunk)),
      );

      snapshot.docs.forEach((movieDoc) => {
        const data = movieDoc.data();

        results.push({
          movieId: data.movieId ?? Number(movieDoc.id),

          title: data.title ?? "",

          movieSynopsis: data.movieSynopsis ?? "",

          posterPath: data.posterPath ?? null,

          genreIds: Array.isArray(data.genreIds) ? data.genreIds : [],

          voteAverage:
            typeof data.voteAverage === "number" ? data.voteAverage : 0,

          createdAt: data.createdAt ?? null,

          updatedAt: data.updatedAt ?? null,
        });
      });
    }

    return results;
  } catch (error) {
    throw error;
  }
};
