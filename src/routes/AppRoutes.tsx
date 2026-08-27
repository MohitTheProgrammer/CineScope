import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "../layout/MainLayout";

const Home = lazy(() => import("../pages/Home"));
const Trending = lazy(() => import("../pages/Trending"));
const MovieDetail = lazy(() => import("../pages/MovieDetail"));
const Search = lazy(() => import("../pages/Search"));
const Popular = lazy(() => import("../pages/Popular"));
const AuthPage = lazy(() => import("../pages/auth/AuthPage"));
const Profile = lazy(() => import("../pages/Profile"));
const MyList = lazy(() => import("../pages/MyList"));

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<main className="min-h-screen bg-(--bg-primary)" />}>
            <Routes>

                {/* Public application routes */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/trending"
                        element={<Trending />}
                    />
                    <Route
                        path="/movie/:movieId"
                        element={<MovieDetail />}

                    />

                    <Route
                        path="/search"
                        element={<Search />}
                    />

                    <Route path="/popular" element={<Popular />} />
                    <Route path="/my-list" element={<MyList />} />

                    <Route
                        path="/login"
                        element={<AuthPage />}
                    />

                    <Route
                        path="/register"
                        element={<AuthPage />}
                    />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<main className="flex min-h-screen items-center justify-center bg-(--bg-primary) text-center text-white"><div><h1 className="text-3xl font-black">Page not found</h1><a className="mt-4 inline-block text-(--accent-primary)" href="/">Return home</a></div></main>} />
                </Route>
            </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;
