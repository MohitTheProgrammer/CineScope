import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import { lazy, Suspense, type ReactNode } from "react";

import MainLayout from "../layout/MainLayout";
import { useUser } from "../context/UserContext";

const Home = lazy(() => import("../pages/Home"));
const Trending = lazy(() => import("../pages/Trending"));
const MovieDetail = lazy(() => import("../pages/MovieDetail"));
const Search = lazy(() => import("../pages/Search"));
const Popular = lazy(() => import("../pages/Popular"));
const AuthPage = lazy(() => import("../pages/auth/AuthPage"));
const Profile = lazy(() => import("../pages/Profile"));
const MyList = lazy(() => import("../pages/MyList"));
const ForYou = lazy(() => import("../pages/ForYou"));
const HowItWorks = lazy(
    () => import("../pages/HowItWorks")
);

/* ==========================================================================
   Protected Route
   ========================================================================== */

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({
    children,
}: ProtectedRouteProps) => {
    const { user, loading } = useUser();

    /*
     * Firebase is still checking whether the user
     * already has an authenticated session.
     *
     * IMPORTANT:
     * Don't redirect while loading is true.
     */
    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-(--bg-primary)">
                <div className="text-sm text-white/40">
                    Loading...
                </div>
            </main>
        );
    }

    /*
     * Firebase finished checking and there is
     * no authenticated user.
     */
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <>{children}</>;
};

/* ==========================================================================
   App Routes
   ========================================================================== */

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <main className="min-h-screen bg-(--bg-primary)" />
                }
            >
                <Routes>

                    {/* ======================================================
                        Public application routes
                       ====================================================== */}

                    <Route element={<MainLayout />}>

                        <Route
                            path="/"
                            element={<Home />}
                        />

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

                        <Route
                            path="/popular"
                            element={<Popular />}
                        />

                        <Route
                            path="/how-it-works"
                            element={<HowItWorks />}
                        />

                        {/* ==================================================
                            Protected routes
                           ================================================== */}

                        <Route
                            path="/my-list"
                            element={
                                <ProtectedRoute>
                                    <MyList />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/for-you"
                            element={
                                <ProtectedRoute>
                                    <ForYou />
                                </ProtectedRoute>
                            }
                        />

                        {/* ==================================================
                            Authentication
                           ================================================== */}

                        <Route
                            path="/login"
                            element={<AuthPage />}
                        />

                        <Route
                            path="/register"
                            element={<AuthPage />}
                        />

                        {/* ==================================================
                            404
                           ================================================== */}

                        <Route
                            path="*"
                            element={
                                <main className="flex min-h-screen items-center justify-center bg-(--bg-primary) text-center text-white">
                                    <div>
                                        <h1 className="text-3xl font-black">
                                            Page not found
                                        </h1>

                                        <a
                                            className="mt-4 inline-block text-(--accent-primary)"
                                            href="/"
                                        >
                                            Return home
                                        </a>
                                    </div>
                                </main>
                            }
                        />

                    </Route>

                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;