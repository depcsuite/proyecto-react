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

export const getFavoritos = async (usuario) => Service('/actions.php', {
    method: 'GET',
    params: {
        do: 'getFavoritos',
        user: usuario
    }
});