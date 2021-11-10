const axios = require('axios').default;

const { REST_BASE_URL } = require('../config/constants');

const Service = axios.create({
    baseURL: REST_BASE_URL,
    timeout: 5000
});

export const logIn = async (usuario, clave) => Service('/login.php', {
    method: 'POST',
    params: {
        user: usuario,
        password: clave
    }
});

export const signUp = async (usuario, clave, nombre, apellido) => Service('/signup.php', {
    method: 'POST',
    params: {
        user: usuario,
        password: clave,
        name: nombre,
        lastName: apellido
    }
});

export const obtenerPromociones = async () => Service('/actions.php', {
    method: 'GET',
    params: {
        do: 'getPromociones'
    }
});

export const obtenerOfertas = async () => Service('/actions.php', {
    method: 'GET',
    params: {
        do: 'getDestacados'
    }
});

export const obtenerProductos = async () => Service('/actions.php', {
    method: 'GET',
    params: {
        do: 'getProductos'
    }
});

export const setFavorito = async (id, user) => Service('/actions.php', {
    method: 'POST',
    params: {
        do: 'setFavorito',
        id: id,
        user: user
    }
});

export const removeFavorito = async (id, user) => Service('/actions.php', {
    method: 'POST',
    params: {
        do: 'removeFavorito',
        id: id,
        user: user
    }
});
