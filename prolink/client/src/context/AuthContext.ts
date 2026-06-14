import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("token"));

    const login = (token : string) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);
    
    return React.createElement(
        AuthContext.Provider,
        { value: { isLoggedIn, login, logout } },
        children
    );
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}