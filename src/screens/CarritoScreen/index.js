import React, { useState, useContext, useEffect } from 'react';
import { Text, View, FlatList, Dimensions, Button, RefreshControl } from 'react-native';
import { IconButton } from 'react-native-paper';
import { AuthContext } from '../../navigation/AuthProvider';

export default function CarritoScreen() {

    const { data, actions } = useContext(AuthContext);

    const [total, setTotal] = useState(0);

    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        setLoading(true);
        let cant = 0;
        data.carrito.forEach(function (item) {
            cant += item.total;
        });
        setTotal(cant);
        setLoading(false);
    }, [data.carrito, refresh]);

    const renderItem = ({ item }) => {
        return (
            <View style={{ backgroundColor: '#EDEDED', marginBottom: 15, marginHorizontal: 15, padding: 15, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 12 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingEnd: 30 }}>
                    <Text style={{ fontSize: 17 }}>{item.nombre}</Text>
                    <Text style={{ fontSize: 15 }}>Cant: {item.cantidad}</Text>
                </View>
                <IconButton
                    icon={'close'}
                    size={25}
                    color={'#000'}
                    onPress={() => {
                        actions.removeCarrito(item.id);
                    }}
                />
            </View>
        );
    }

    const handleRefresh = () => {
        setRefresh(prevValue => !prevValue);
    }

    return (
        <FlatList
            data={data.carrito}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            horizontal={false}
            ListEmptyComponent={
                <View style={{ alignItems: 'center' }}>
                    <Text>No hay productos agregados al carrito.</Text>
                </View>
            }
            ListFooterComponent={
                data.carrito.length == 0 ?
                    <></>
                    :
                    <View style={{ width: Dimensions.get('screen').width, alignItems: 'center' }}>
                        <Text style={{ marginVertical: 20, fontSize: 17 }}>Total {total}</Text>
                        <Button
                            title={'Registrar pedido'}
                            onPress={() => {
                                actions.registrarPedido();
                            }}
                        />
                    </View>
            }
            style={{
                backgroundColor: 'white',
                paddingTop: 20
            }}
            refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={loading} />}
        />
    );
}