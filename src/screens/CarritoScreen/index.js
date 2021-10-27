import React, { useState } from 'react';
import { Button, FlatList, Text } from 'react-native';

import EventSource from 'react-native-sse';

export default function CarritoScreen() {

    const [dataPedidos, setDataPedidos] = useState(null);

    const es = new EventSource('https://nelsontarche.com.ar/api/rest/actions.php?do=obtenerEstado');

    es.addEventListener('open', (event) => {
        console.log('Open SSE connection.', event);
    });

    es.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        console.log(data);
        setDataPedidos(data);
    });

    es.addEventListener('error', (event) => {
        if (event.type === 'error') {
            console.error('Connection error:', event.message);
        } else if (event.type === 'exception') {
            console.error('Error:', event.message, event.error);
        }
    });

    es.addEventListener('close', (event) => {
        console.log('Close SSE connection.');
    });

    const renderItem = ({ item }) => {
        return (
            <Text>{JSON.stringify(item)}</Text>
        );
    }

    return (
        <>
            <Text>Esta es la pantalla del carrito. Hola!!!</Text>
            <Button title='Cerrar' onPress={() => { es.close() }} />
            <FlatList
                data={dataPedidos}
                renderItem={renderItem}
                keyExtractor={item => new Date().getMilliseconds()}
            />
        </>
    );
}