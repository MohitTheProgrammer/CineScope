import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";
import Trending from "../pages/Trending";
import MovieDetail from "../pages/MovieDetail";
import Search from "../pages/Search";
import Popular from "../pages/Popular";
import AuthPage from "../pages/auth/AuthPage";
import Profile from "../pages/Profile";
// import Search from "../pages/Search";
// import MovieDetails from "../pages/MovieDetails";
// import Login from "../pages/Login";
// import MyList from "../pages/MyList";
// import Recommendations from "../pages/Recommendations";
// import NotFound from "../pages/NotFound";

// import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
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

                    <Route
                        path="/login"
                        element={<AuthPage />}
                    />

                    <Route
                        path="/register"
                        element={<AuthPage />}
                    />

                    <Route path="/profile" element={<Profile />} />


                </Route>



            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;