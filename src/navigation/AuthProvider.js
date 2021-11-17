import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Service from '../services';
import { useFonts } from 'expo-font';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userData, setUserData] = useState({});
    const [carrito, setCarrito] = useState([]);

    const [promociones, setPromociones] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [fonts, setFonts] = useState([]);

    const [loaded] = useFonts({
        MontserratRegular: require('../../assets/fonts/Montserrat-Regular.ttf')
    });

    const logIn = async (b) => {
        try {
            const result = await Service.logIn(b.user, b.password);
            if (result.status == 200) {
                const { data } = result;
                if (data.code == 200) {
                    setIsLoggedIn(true);
                    const { user } = data;
                    setUserData({ id: 1, usuario: user.user, nombre: user.nombre, apellido: user.apellido });
                    await AsyncStorage.setItem('@isLoggedIn', JSON.stringify(true));
                    await AsyncStorage.setItem('@id', JSON.stringify(1));
                    await AsyncStorage.setItem('@usuario', user.user);
                    await AsyncStorage.setItem('@nombre', user.nombre);
                    await AsyncStorage.setItem('@apellido', user.apellido);
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
            return { code: 400, msg: 'Las contraseñas deben coincidir.' };
        } else {
            const result = await Service.signUp(usuario, clave, nombre, apellido);
            if (result.status == 200) {
                return result.data;
            } else {
                return { code: 500, msg: 'Error del servidor' };
            }
        }
    }

    const logOut = async (b = false) => {
        setIsLoggedIn(b);
        try {
            // await AsyncStorage.removeItem('@isLoggedIn');
            let keys = ['@isLoggedIn', '@id', '@usuario', '@nombre', '@apellido'];
            await AsyncStorage.multiRemove(keys);
            setCarrito([]);
        } catch (error) {
            console.warn(error);
        }
    }

    const getPromociones = async () => {
        try {
            const result = await Service.obtenerPromociones(userData.usuario);
            if (result.status == 200) {
                const { data } = result;
                if (data.code == 200) {
                    return data.body;
                }
            }
        } catch (e) {
            console.warn(e);
        }
        return null;
    }

    const getOfertas = async () => {
        try {
            const result = await Service.obtenerOfertas(userData.usuario);
            if (result.status == 200) {
                const { data } = result;
                if (data.code == 200) {
                    return data.body;
                }
            }
        } catch (e) {
            console.warn(e);
        }
        return null;
    }

    const getProductos = async () => {
        try {
            console.log(userData.usuario); //Está tirando undefined la primera vez que se abre la app
            const result = await Service.obtenerProductos(userData.usuario);
            if (result.status == 200) {
                const { data } = result;
                if (data.code == 200) {
                    return data.body;
                }
            }
        } catch (e) {
            console.warn(e);
        }
        return null;
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
        return carritoAux;
    }

    const agregarFavorito = async (id) => {
        const result = await Service.setFavorito(id, userData.usuario);
        if (result.status == 200) {
            return result.data.code;
        }
        return null;
    }

    const eliminarFavorito = async (id) => {
        const result = await Service.removeFavorito(id, userData.usuario);
        if (result.status == 200) {
            return result.data.code;
        }
        return null;
    }

    const getFavoritos = async () => {
        const result = await Service.obtenerFavoritos(userData.usuario);
        if (result.status == 200) {
            const { data } = result;
            if (data.code == 200) {
                return data.body.favoritos;
            }
        }
        return [];
    }

    const registrarPedido = () => {
        // console.log(carrito);
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

        if (loaded) {
            setFonts(['MontserratRegular']);
        }
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
                    fonts,
                    carrito,
                    promociones,
                    ofertas,
                    productos
                },
                actions: {
                    addCarrito,
                    removeCarrito,
                    registrarPedido,
                    getPromociones,
                    getOfertas,
                    getProductos,
                    agregarFavorito,
                    eliminarFavorito,
                    getFavoritos
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}