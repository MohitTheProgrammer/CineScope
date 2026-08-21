import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";

function App() {
  return (
    <main className="min-h-screen bg-(--bg-primary) px-6 pt-28">
      <Navbar />

      <div className="flex gap-5 overflow-x-auto pb-10">
        <MovieCard
          id={550}
          title="Fight Club"
          posterPath="/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
          releaseDate="1999-10-15"
          rating={8.4}
          genres={["Drama", "Thriller"]}
        />

        <MovieCard
          id={27205}
          title="Inception"
          posterPath="/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
          releaseDate="2010-07-15"
          rating={8.4}
          genres={["Action", "Sci-Fi"]}
        />
      </div>
    </main>
  );
}

export default App;