import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Service from '../services';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userData, setUserData] = useState({});
    const [carrito, setCarrito] = useState([]);

    const logIn = async (b) => {
        try {
            const result = await Service.logIn(b.user, b.password);
            if (result.status == 200) {
                const { data } = result;
                if (data.code == 200) {
                    setIsLoggedIn(true);
                    setUserData({ id: 1, usuario: 'israShort', nombre: 'Israel', apellido: 'Short' });
                    await AsyncStorage.setItem('@isLoggedIn', JSON.stringify(true));
                    await AsyncStorage.setItem('@id', JSON.stringify(1));
                    await AsyncStorage.setItem('@usuario', 'israShort');
                    await AsyncStorage.setItem('@nombre', 'Israel');
                    await AsyncStorage.setItem('@apellido', 'Short');
                } else if (data.code == 400) {
                    console.warn(result.data.msg);
                }
            } else {
                console.warn(result.statusText);
            }
        } catch (error) {
            console.warn(error);
        }
    }

    const signUp = async (nombre, apellido, usuario, clave, claveRepetida) => {
        if (clave != claveRepetida) {
            return { code: 400, msg: `Las contraseñas deben coincidir.` };
        } else {
            return { code: 200, msg: `Usuario ${usuario} registrado con éxito.` };
        }
    }

    const logOut = async (b = false) => {
        setIsLoggedIn(b);
        try {
            // await AsyncStorage.removeItem('@isLoggedIn');
            let keys = ['@isLoggedIn', '@id', '@usuario', '@nombre', '@apellido'];
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            console.warn(error);
        }
    }

    const addCarrito = (item) => {
        if (item.cantidad == 0) { } else {
            let encontrado = false;
            carrito.forEach(function (value, index) {
                if (item.id == value.id) {
                    encontrado = true;
                    carrito[index] = {
                        id: value.id,
                        nombre: value.nombre,
                        precio: value.precio,
                        cantidad: item.cantidad,
                        total: item.cantidad * item.precio
                    }
                }
            });
            if (!encontrado) {
                carrito.push(item);
            }
            setCarrito(carrito);
        }
    }

    const removeCarrito = (id) => {
        let carritoAux = [];
        carrito.forEach(function (item) {
            if (!(item.id == id)) {
                carritoAux.push(item);
            }
        });
        setCarrito(carritoAux);
    }

    const registrarPedido = () => {
        console.log(carrito);
    }

    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('@isLoggedIn');

                const idUsuario = await AsyncStorage.getItem('@id');
                const usuario = await AsyncStorage.getItem('@usuario');
                const nombre = await AsyncStorage.getItem('@nombre');
                const apellido = await AsyncStorage.getItem('@apellido');

                if (value != null) {
                    setIsLoggedIn(value);
                    setUserData({ id: JSON.parse(idUsuario), usuario: usuario, nombre: nombre, apellido: apellido });
                }
            } catch (error) {
                console.warn(error);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth: {
                    logIn,
                    signUp,
                    logOut
                },
                user: {
                    isLoggedIn,
                    userData
                },
                data: {
                    carrito
                },
                actions: {
                    addCarrito,
                    removeCarrito,
                    registrarPedido
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}