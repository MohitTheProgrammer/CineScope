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

      console.log(
        `[MovieService] Global movie updated successfully: ${movie.id}`,
      );
    } else {
      await setDoc(movieRef, {
        ...movieData,
        createdAt: serverTimestamp(),
      });

      console.log(
        `[MovieService] Global movie created successfully: ${movie.id}`,
      );
    }
  } catch (error) {
    console.error(
      `[MovieService] Failed to create/update global movie: ${movie.id}`,
      error,
    );

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
      console.log(`[MovieService] User document not found: ${uid}`);

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
      console.log(`[MovieService] Movie is not rated: ${movieId}`);

      return null;
    }

    console.log(`[MovieService] Movie rating fetched successfully: ${movieId}`);

    return movieRating;
  } catch (error) {
    console.error(
      `[MovieService] Failed to get movie rating: ${movieId}`,
      error,
    );

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
    console.log("[MovieService] Adding liked movie:", movie.id);

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

    console.log("[MovieService] Movie liked successfully:", movie.id);
  } catch (error) {
    console.error("[MovieService] Failed to like movie:", error);

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
    console.log("[MovieService] Removing liked movie:", movieId);

    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      liked: arrayRemove(movieId),
      updatedAt: serverTimestamp(),
    });

    console.log("[MovieService] Movie unliked successfully:", movieId);
  } catch (error) {
    console.error("[MovieService] Failed to remove like:", error);

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
  } catch (error) {
    console.error(`[MovieService] Failed to check liked movie: ${movieId}`, error);

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
    console.log("[MovieService] Adding movie to watchlist:", movie.id);

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

    console.log("[MovieService] Movie added to watchlist:", movie.id);
  } catch (error) {
    console.error("[MovieService] Failed to add watchlist movie:", error);

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
    console.log("[MovieService] Removing movie from watchlist:", movieId);

    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      watchlist: arrayRemove(movieId),
      updatedAt: serverTimestamp(),
    });

    console.log("[MovieService] Movie removed from watchlist:", movieId);
  } catch (error) {
    console.error("[MovieService] Failed to remove watchlist movie:", error);

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
      console.log(`[MovieService] User document not found: ${uid}`);

      return false;
    }

    const data = snapshot.data();

    const watchlist = data.watchlist ?? [];

    const exists = watchlist.includes(movieId);

    console.log(`[MovieService] Watchlist check: ${movieId} -> ${exists}`);

    return exists;
  } catch (error) {
    console.error(
      `[MovieService] Failed to check watchlist: ${movieId}`,
      error,
    );

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
    console.log("[MovieService] Adding watched movie:", movie.id);

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

    console.log("[MovieService] Movie marked as watched:", movie.id);
  } catch (error) {
    console.error("[MovieService] Failed to add watched movie:", error);

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
      console.log(`[MovieService] User document not found: ${uid}`);

      return false;
    }

    const data = snapshot.data();

    const watched = Array.isArray(data.watched) ? data.watched : [];

    const exists = watched.includes(movieId);

    console.log(
      `[MovieService] Watched state checked: ${movieId} -> ${exists}`,
    );

    return exists;
  } catch (error) {
    console.error(
      `[MovieService] Failed to check watched movie: ${movieId}`,
      error,
    );

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
    console.log("[MovieService] Rating movie:", movie.id, "rating:", rating);

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

    console.log("[MovieService] Movie rated successfully:", movie.id, rating);
  } catch (error) {
    console.error("[MovieService] Failed to rate movie:", error);

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
    console.log("[MovieService] Fetching global movie:", movieId);

    const movieRef = doc(db, "movies", String(movieId));

    const snapshot = await getDoc(movieRef);

    if (!snapshot.exists()) {
      console.log("[MovieService] Global movie not found:", movieId);

      return null;
    }

    const data = snapshot.data();

    console.log("[MovieService] Global movie fetched:", movieId);

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
    console.error("[MovieService] Failed to fetch global movie:", error);

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
    console.log("[MovieService] Fetching user movie state:", movieId);

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

    console.log("[MovieService] User movie state:", movieId, result);

    return result;
  } catch (error) {
    console.error("[MovieService] Failed to fetch user movie state:", error);

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
    console.log("[MovieService] Fetching liked movies");

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

    console.log("[MovieService] Liked movies fetched:", result.length);

    return result;
  } catch (error) {
    console.error("[MovieService] Failed to fetch liked movies:", error);

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
    console.log("[MovieService] Fetching watchlist movies");

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

    console.log("[MovieService] Watchlist movies fetched:", result.length);

    return result;
  } catch (error) {
    console.error("[MovieService] Failed to fetch watchlist movies:", error);

    throw error;
  }
};

/* =========================================================
   GET USER WATCHED MOVIES
   ========================================================= */

export const getWatchedMovies = async (uid: string): Promise<GlobalMovie[]> => {
  try {
    console.log("[MovieService] Fetching watched movies");

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

    console.log("[MovieService] Watched movies fetched:", result.length);

    return result;
  } catch (error) {
    console.error("[MovieService] Failed to fetch watched movies:", error);

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

    console.log(
      `[MovieService] Global movies fetched successfully: ${results.length}`,
    );

    return results;
  } catch (error) {
    console.error("[MovieService] Failed to fetch movies by IDs:", error);

    throw error;
  }
};
