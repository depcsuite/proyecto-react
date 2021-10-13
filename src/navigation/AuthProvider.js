import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logIn = async (b) => {
        setIsLoggedIn(b);
        try {
            await AsyncStorage.setItem('@isLoggedIn', JSON.stringify(b));
        } catch (error) {
            console.error(error);
        }
    }

    const signUp = async (b = false) => {
        setIsLoggedIn(b);
        try {
            // await AsyncStorage.removeItem('@isLoggedIn');
            let keys = ['@isLoggedIn'];
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('@isLoggedIn');
                if (value != null) {
                    setIsLoggedIn(value);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

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