import { createContext, ReactElement, useEffect, useState } from "react";

interface AuthContextInterface {
    isLoggedIn: undefined;
    getIsLoggedIn: () => Promise<void>;
}

type Props = {
    children: ReactElement;
};

const defaultState = {
    isLoggedIn: undefined,
    getIsLoggedIn: async (): Promise<void> => {},
};

export const AuthContext = createContext<AuthContextInterface>(defaultState);

export const AuthProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<any>(undefined);

    const getIsLoggedIn = async (): Promise<void> => {
        const response = await fetch("/auth/isLoggedIn");
        const data = await response.json();

        setIsLoggedIn(data);
    };

    useEffect(() => {
        getIsLoggedIn();
    }, [false]);
    return (
        <AuthContext.Provider value={{ isLoggedIn, getIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
