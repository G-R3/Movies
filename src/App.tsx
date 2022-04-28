import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home, Browse } from "./pages";

function App(): JSX.Element {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="browse" element={<Browse />} />
            </Route>
        </Routes>
    );
}

export default App;
