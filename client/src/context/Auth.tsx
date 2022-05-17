import { createContext, ReactElement, useEffect, useState } from "react";

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

    const getIsLoggedIn = async (): Promise<void> => {
        const response = await fetch("/auth/isLoggedIn");
        const data = await response.json();

        setIsLoggedIn(data);
        console.log(data);
    };

    useEffect(() => {
        getIsLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, getIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
