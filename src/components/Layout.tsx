import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = (): JSX.Element => {
    return (
        <div className="px-10 bg-slate-200">
            <header>
                <Navbar />
            </header>
            <Outlet />
        </div>
    );
};

export default Layout;
