import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home, Browse, MoviePage, Profile, ListPage } from "./pages";

function App(): JSX.Element {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="browse" element={<Browse />} />
                <Route path="browse">
                    <Route path=":movieId" element={<MoviePage />} />
                </Route>
                <Route path="profile" element={<Profile />} />
                <Route path="profile">
                    <Route path=":listId" element={<ListPage />} />
                </Route>

                <Route path="*" element={"Not found"} />
            </Route>
        </Routes>
    );
}

export default App;
