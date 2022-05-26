import { useContext, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Props {
    children: ReactElement;
}

export default function RequireAuth({ children }: Props): JSX.Element {
    const { isLoggedIn } = useContext(AuthContext);
    if (isLoggedIn === false) return <Navigate to="/" replace />;
    return <>{children}</>;
}
