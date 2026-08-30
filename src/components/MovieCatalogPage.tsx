import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MoviesResponse { results: Movie[]; total_pages: number; }
interface Props { title: string; description: string; emptyMessage: string; loadMovies: (page: number) => Promise<MoviesResponse>; }

const MovieCatalogPage = ({ title, description, emptyMessage, loadMovies }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        let active = true;
        void (async () => {
            try { setLoading(true); setError(""); const data = await loadMovies(page); if (active) { setMovies(data.results); setTotalPages(Math.min(data.total_pages, 500)); } }
            catch { if (active) { setError("Unable to load movies right now."); } }
            finally { if (active) setLoading(false); }
        })();
        return () => { active = false; };
    }, [loadMovies, page, retryKey]);

    const changePage = (nextPage: number) => { if (nextPage < 1 || nextPage > totalPages || nextPage === page) return; setSearchParams({ page: String(nextPage) }); window.scrollTo({ top: 0, behavior: "smooth" }); };

    return <main className="min-h-screen bg-(--bg-primary)">
        <section className="relative overflow-hidden border-b border-white/5 px-6 pb-14 pt-32 lg:px-8"><div className="pointer-events-none absolute -right-40 -top-40 size-96 rounded-full bg-(--accent-primary)/10 blur-[120px]" /><div className="relative mx-auto max-w-7xl"><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-(--accent-primary)">Discover</p><h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">{title} <span className="text-(--accent-primary)">Movies</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">{description}</p>{!loading && !error && <p className="mt-6 text-xs font-medium text-white/50">Showing page {page} of {totalPages}</p>}</div></section>
        <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">{loading && <GridSkeleton />}{!loading && error && <ErrorState onRetry={() => setRetryKey((key) => key + 1)} />}{!loading && !error && movies.length > 0 && <><div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">{movies.map((movie) => <MovieCard key={movie.id} {...movie} orientation="vertical" />)}</div><Pagination currentPage={page} totalPages={totalPages} onPageChange={changePage} /></>}{!loading && !error && movies.length === 0 && <p className="py-20 text-center text-white/60">{emptyMessage}</p>}</section>
    </main>;
};

const GridSkeleton = () => <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">{Array.from({ length: 18 }, (_, index) => <div key={index} className="aspect-2/3 animate-pulse rounded-2xl bg-white/5" />)}</div>;
const ErrorState = ({ onRetry }: { onRetry: () => void }) => <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-10 text-center"><p className="text-white/70">Unable to load movies right now.</p><button type="button" onClick={onRetry} className="mt-5 rounded-full bg-(--accent-primary) px-5 py-2.5 text-xs font-bold text-white">Try again</button></div>;
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => { const pages = Array.from(new Set([1, currentPage - 1, currentPage, currentPage + 1, totalPages].filter((page) => page >= 1 && page <= totalPages))).sort((a, b) => a - b); return <nav aria-label="Movie pagination" className="mt-16 flex flex-wrap items-center justify-center gap-2"><PageButton label="Previous page" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>‹</PageButton>{pages.map((item, index) => <span key={item} className="contents">{index > 0 && item - pages[index - 1] > 1 && <span className="px-1 text-white/50">…</span>}<PageButton label={`Page ${item}`} active={item === currentPage} onClick={() => onPageChange(item)}>{item}</PageButton></span>)}<PageButton label="Next page" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>›</PageButton></nav>; };
const PageButton = ({ children, label, active, disabled, onClick }: { children: ReactNode; label: string; active?: boolean; disabled?: boolean; onClick: () => void }) => <button type="button" aria-label={label} aria-current={active ? "page" : undefined} disabled={disabled} onClick={onClick} className={`flex size-10 items-center justify-center rounded-full border text-xs font-bold transition-colors disabled:opacity-30 ${active ? "border-(--accent-primary) bg-(--accent-primary) text-white" : "border-white/10 bg-white/5 text-white/70 hover:border-(--accent-primary)"}`}>{children}</button>;
export default MovieCatalogPage;
