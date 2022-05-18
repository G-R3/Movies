import { createContext, ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface AuthContextInterface {
    isLoggedIn: boolean;
    getIsLoggedIn?: () => void;
}

type Props = {
    children: ReactElement;
};

const defaultState = {
    isLoggedIn: false,
};

export const AuthContext = createContext<AuthContextInterface>(defaultState);

export const AuthProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const location = useLocation();

    const getIsLoggedIn = async (): Promise<void> => {
        const response = await fetch("/auth/isLoggedIn");
        const data = await response.json();

        setIsLoggedIn(data);
    };

    useEffect(() => {
        getIsLoggedIn();
    }, [location]);
    return (
        <AuthContext.Provider value={{ isLoggedIn, getIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
