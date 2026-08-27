import MovieCatalogPage from "../components/MovieCatalogPage";
import { getPopularMovies } from "../services/tmdb";

const Popular = () => <MovieCatalogPage title="Popular" description="Explore the movies everyone is watching and find your next favourite." emptyMessage="No popular movies found." loadMovies={getPopularMovies} />;

export default Popular;
