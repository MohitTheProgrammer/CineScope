import MovieCatalogPage from "../components/MovieCatalogPage";
import { getTrendingMovies } from "../services/tmdb";

const Trending = () => <MovieCatalogPage title="Trending" description="See what people are watching right now and discover something worth adding to your list." emptyMessage="No trending movies found." loadMovies={getTrendingMovies} />;

export default Trending;
