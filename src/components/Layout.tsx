import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = (): JSX.Element => {
    return (
        <div className="h-full px-5 md:px-10">
            <header>
                <Navbar />
            </header>
            <Outlet />
        </div>
    );
};

export default Layout;
