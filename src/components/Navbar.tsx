import { Link } from "react-router-dom";

const Navbar = (): JSX.Element => {
    return (
        <nav className="flex justify-between items-center h-10">
            <h2 className="text-2xl">Movie</h2>
            <ul className="flex gap-5">
                <li>
                    <Link to="/browse">Browse</Link>
                </li>
                <li>Login</li>
                <li>Sign up</li>
            </ul>
        </nav>
    );
};

export default Navbar;
