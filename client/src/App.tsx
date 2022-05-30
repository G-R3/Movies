import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { Home, Browse, MoviePage, Profile, ListPage, NotFound } from "./pages";

function App(): JSX.Element {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="browse" element={<Browse />} />
                <Route path="browse">
                    <Route path=":movieId" element={<MoviePage />} />
                </Route>
                <Route
                    path="profile"
                    element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }
                />
                <Route path="profile">
                    <Route
                        path=":listId"
                        element={
                            <RequireAuth>
                                <ListPage />
                            </RequireAuth>
                        }
                    />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
