import React, { useState } from 'react';
import { Dimensions, FlatList, ImageBackground, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import style from './styles';

export default function HomeScreen({ navigation }) {

    const image = { uri: "https://reactjs.org/logo-og.png" };

    const [promocionesData, setPromocionesData] = useState(null);
    const [ofertasData, setOfertasData] = useState(null);

    const DATA = [
        {
            id: '1a',
            title: 'Promocion 1',
            aclaracion: 'Aclaración de la promoción 1'
        },
        {
            id: '2b',
            title: 'Promocion 2',
            aclaracion: 'Aclaración de la promoción 2'
        },
        {
            id: '3c',
            title: 'Promocion 3',
            aclaracion: 'Aclaración de la promoción 3'
        },
        {
            id: '4d',
            title: 'Promocion 4',
            aclaracion: 'Aclaración de la promoción 4'
        },
        {
            id: '5e',
            title: 'Promocion 5',
            aclaracion: 'Aclaración de la promoción 5'
        },
        {
            id: '6e',
            title: 'Promocion 6',
            aclaracion: 'Aclaración de la promoción 5'
        },
        {
            id: '7e',
            title: 'Promocion 7',
            aclaracion: 'Aclaración de la promoción 5'
        }
    ];

    const DATA_OFERTAS = [
        {
            id: 1,
            nombre: 'Producto 1',
            aclaracion: 'Aclaracion 1',
            precioOferta: 300,
            precioProducto: 450
        },
        {
            id: 2,
            nombre: 'Producto 2',
            aclaracion: 'Aclaracion 2',
            precioOferta: 320,
            precioProducto: 560
        },
        {
            id: 3,
            nombre: 'Producto 3',
            aclaracion: 'Aclaracion 3',
            precioOferta: null,
            precioProducto: 400
        },
        {
            id: 4,
            nombre: 'Producto 4',
            aclaracion: 'Aclaracion 4',
            precioOferta: 320,
            precioProducto: 560
        },
    ];

    const PRODUCTOS = [
        {
            idRubro: 1,
            rubro: 'Hamburguesas',
            productos: [
                {
                    id: 1,
                    nombre: 'Hamburguesa clásica',
                    descripcion: 'Hamburguesa clásica hecha con tomate, lechuga y cebolla caramelizada',
                    precio: 560,
                    imagenDetalle: 'https://reactjs.org/logo-og.png'
                },
                {
                    id: 2,
                    nombre: 'Hamburguesa clásica 2',
                    descripcion: 'Hamburguesa clásica 2',
                    precio: 620,
                    imagenDetalle: 'https://reactjs.org/logo-og.png'
                },
                {
                    id: 3,
                    nombre: 'Hamburguesa clásica 3',
                    descripcion: 'Hamburguesa clásica 3',
                    precio: 250,
                    imagenDetalle: 'https://reactjs.org/logo-og.png'
                }
            ]
        },
        {
            idRubro: 2,
            rubro: 'Tacos',
            productos: [
                {
                    id: 1,
                    nombre: 'Taco 1',
                    descripcion: 'Taco 1',
                    precio: 400,
                    imagenDetalle: 'https://reactjs.org/logo-og.png'
                }
            ]
        }
    ];

    const MAX_HEIGHT_ITEM = Dimensions.get('screen').height / 7.5;

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
                    source={image}
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
                        source={image}
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
        <ScrollView>
            <Text style={{ fontSize: 23 }}>Promociones</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                horizontal={true}
                keyExtractor={item => item.id}
            />
            <Text style={{ fontSize: 23 }}>Ofertas</Text>
            <FlatList
                data={DATA_OFERTAS}
                renderItem={renderItemOfertas}
                horizontal={true}
                keyExtractor={item => `${item.id}`}
            />
            <Text style={{ fontSize: 23 }}>Productos</Text>
            <FlatList
                data={PRODUCTOS}
                renderItem={renderItemProductos}
                horizontal={false}
                keyExtractor={item => `${item.idRubro}`}
            />
        </ScrollView>
    );
}