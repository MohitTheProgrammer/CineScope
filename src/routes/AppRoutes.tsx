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
                        path="/movie/:id"
                        element={<MovieDetail />}

                    />

                    <Route
                        path="/search"
                        element={<Search />}
                    />

                    {/* <Route
            path="/search"
            element={<Search />}
          /> */}

                    {/* <Route
            path="/movie/:id"
            element={<MovieDetails />}
          /> */}

                    {/* Protected routes */}
                    {/* <Route element={<ProtectedRoute />}>
            <Route
              path="/my-list"
              element={<MyList />}
            />

            <Route
              path="/recommendations"
              element={<Recommendations />}
            />
          </Route> */}
                </Route>

                {/* Authentication */}
                {/* <Route
          path="/login"
          element={<Login />}
        /> */}

                {/* 404 */}
                {/* <Route
          path="*"
          element={<NotFound />}
        /> */}

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;