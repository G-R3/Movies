import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home, Browse, MoviePage, Profile } from "./pages";

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
            </Route>
        </Routes>
    );
}

export default App;
