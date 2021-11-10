import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, FlatList, ImageBackground, Text, View, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import style from './styles';

const { REST_BASE_IMAGES, NO_IMAGE } = require('../../config/constants');

export default function HomeScreen({ navigation }) {

    const image = { uri: "https://reactjs.org/logo-og.png" };

    const { data, actions } = useContext(AuthContext);

    const [promocionesData, setPromocionesData] = useState(null);
    const [ofertasData, setOfertasData] = useState(null);
    const [productosData, setProductosData] = useState(null);

    const MAX_HEIGHT_ITEM = Dimensions.get('screen').height / 7.5;

    useEffect(() => {
        (async () => {
            let result = await actions.getPromociones();
            if (result == null) {
                console.warn('No se encontraron promociones.');
            } else {
                setPromocionesData(result);
            }

            result = await actions.getOfertas();
            if (result == null) {
                console.warn('No se encontraron ofertas.');
            } else {
                setOfertasData(result);
            }

            result = await actions.getProductos();
            if (result == null) {
                console.warn('No se encontraron productos.');
            } else {
                setProductosData(result);
            }
        })();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => { navigation.navigate('DescuentoStackNavigator', { item: item }); }}
        >
            <ImageBackground
                source={image}
                resizeMode={'cover'}
                style={{
                    width: Dimensions.get('screen').width / 3,
                    height: MAX_HEIGHT_ITEM,
                    marginEnd: 20,
                    justifyContent: 'flex-end'
                }}
            >
                <View
                    style={{ backgroundColor: 'rgba(78,78,78,0.5)' }}
                >
                    <Text style={{ color: 'white', width: '100%' }}>{item.title}</Text>
                    <Text style={{ color: 'white', width: '100%' }}>{item.aclaracion}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )

    const renderItemOfertas = ({ item }) => (
        <View style={{ marginRight: 20, backgroundColor: '#DDDDDD', padding: 10, borderRadius: 12 }}>
            <View style={{ width: 120, height: 90, alignItems: 'center', }}>
                <Image
                    source={{ uri: item.imagen != '' ? `${REST_BASE_IMAGES}${item.imagen}` : `${REST_BASE_IMAGES}${NO_IMAGE}` }}
                    style={{
                        width: 90,
                        height: 90,
                        resizeMode: 'cover',
                        borderRadius: 100
                    }}
                />
            </View>
            <View style={{ marginTop: 6 }}>
                <Text style={{ textAlign: 'center', fontSize: 21, lineHeight: 28 }}>{item.nombre}</Text>
                <Text style={{ textAlign: 'center', fontSize: 17, lineHeight: 22.5 }}>{item.aclaracion}</Text>
                <View style={{ flexDirection: 'row', justifyContent: item.precioOferta != null ? 'space-between' : 'center', paddingHorizontal: 8, marginTop: 5 }}>
                    <Text style={{ textDecorationLine: item.precioOferta != null ? 'line-through' : 'none', fontSize: item.precioOferta != null ? 15 : 18, alignSelf: 'center' }}>{`$ ${item.precioProducto}`}</Text>
                    {item.precioOferta != null ?
                        <Text style={{ fontSize: 18, alignSelf: 'center' }}>{`$ ${item.precioOferta}`}</Text>
                        :
                        <></>
                    }
                </View>
            </View>
        </View>
    )

    const renderItemProducto = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('DescuentoStackNavigator', { item: item }); }}>
            <View style={{ marginVertical: 8, marginStart: 10, marginEnd: 10, flexDirection: 'row' }}>
                <View style={{ alignItems: 'center', paddingStart: 6, paddingEnd: 8 }}>
                    <Image
                        source={{ uri: item.imagenDetalle != '' ? `${REST_BASE_IMAGES}${item.imagenDetalle}` : `${REST_BASE_IMAGES}${NO_IMAGE}` }}
                        style={{
                            width: 70,
                            height: 70,
                            resizeMode: 'cover',
                            borderRadius: 8
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', borderStartWidth: 2, borderColor: 'black', paddingStart: 8 }}>
                    <Text style={{ color: 'black', fontSize: 19 }}>{item.nombre}</Text>
                    <Text style={{ color: 'black', fontSize: 17 }}>{item.descripcion}</Text>
                    <Text style={{ color: 'black', fontSize: 15 }}>{`$ ${item.precio}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    const renderItemProductos = ({ item }) => {
        return (
            <View>
                <Text style={{ fontSize: 21 }}>{item.rubro}</Text>
                <FlatList
                    data={item.productos}
                    renderItem={renderItemProducto}
                    horizontal={false}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
        );
    }

    return (
        <FlatList
            data={productosData}
            ListHeaderComponent={
                <>
                    <Text style={{ fontSize: 23 }}>Promociones</Text>
                    <FlatList
                        data={promocionesData}
                        renderItem={renderItem}
                        horizontal={true}
                        keyExtractor={item => `${item.id}`}
                        ListEmptyComponent={
                            <Text>No se encontraron promociones.</Text>
                        }
                    />
                    <Text style={{ fontSize: 23 }}>Ofertas</Text>
                    <FlatList
                        data={ofertasData}
                        renderItem={renderItemOfertas}
                        horizontal={true}
                        keyExtractor={item => `${item.id}`}
                        ListEmptyComponent={
                            <Text>No se encontraron ofertas.</Text>
                        }
                    />
                    <Text style={{ fontSize: 23 }}>Productos</Text>
                </>
            }
            renderItem={renderItemProductos}
            horizontal={false}
            keyExtractor={item => `${item.idRubro}`}
            ListEmptyComponent={
                <Text>No se encontraron productos.</Text>
            }
        />
    );
}