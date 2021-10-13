import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logIn = (b) => {
        setIsLoggedIn(b);
    }

    const signUp = (b = false) => {
        setIsLoggedIn(b);
    }

    return (
        <AuthContext.Provider
            value={{
                auth: {
                    logIn,
                    signUp
                },
                user: {
                    isLoggedIn
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}