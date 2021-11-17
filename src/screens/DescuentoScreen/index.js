import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import InputCantidad from '../../components/InputCantidad';
import style from './styles';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../../navigation/AuthProvider';
import { NO_IMAGE, REST_BASE_IMAGES } from '../../config/constants';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('screen');

export default function DescuentoScreen({ navigation, route: { params }, route }) {

    const item = (params != undefined) ? params.item : null;

    const { actions, data } = useContext(AuthContext);

    const [cantPedido, setCantPedido] = useState(0);
    const [favorito, setFavorito] = useState(false);

    const [loaded] = useFonts({
        MontserratSemiBold: require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
        MontserratRegular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratLight: require('../../../assets/fonts/Montserrat-Light.ttf'),
        MontserratBold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });

    useEffect(() => {
        setFavorito(item.favorito);
        data.carrito.forEach(function (value) {
            if (value.id == item.id) {
                setCantPedido(parseInt(value.cantidad));
            }
        });
    }, []);

    const sumarCant = () => {
        setCantPedido(prevValue => prevValue + 1);
    }

    const restarCant = () => {
        setCantPedido(prevValue => prevValue - 1);
    }

    const agregarCarrito = () => {
        let productData = {
            id: `${item.id}${item.fkIdRubro}`,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: cantPedido,
            total: cantPedido * item.precio
        };
        actions.addCarrito(productData);
    }

    const handleFavorito = async () => {
        try {
            setFavorito(prevValue => !prevValue);
            let result = await actions.agregarFavorito(item.id);
            if (result != null) {
                if (result == 400) {
                    result = await actions.eliminarFavorito(item.id);
                }
            }
        } catch (e) {
            console.warn(e);
        }
    }

    if (item != null) {
        if (!loaded) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <ActivityIndicator size='large' color={'#000'} />
                </View>
            );
        } else {
            return (
                <View style={style.container}>
                    <View>
                        <Image
                            source={{ uri: item.imagenDetalle != '' ? `${REST_BASE_IMAGES}${item.imagenDetalle}` : `${REST_BASE_IMAGES}${NO_IMAGE}` }}
                            style={{
                                width: width,
                                height: 250,
                                zIndex: 0
                            }}
                        />
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0
                        }}>
                            <IconButton
                                icon={favorito ? 'heart' : 'heart-outline'}
                                size={26}
                                color={'#000'}
                                onPress={async () => {
                                    await handleFavorito();
                                }}
                                style={{
                                    marginHorizontal: 10,
                                    marginVertical: 10
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Title style={{ fontSize: 20, fontFamily: 'MontserratSemiBold', paddingTop: 10 }}>{item.nombre}</Title>

                        <Text style={{ marginTop: 10, fontSize: 16, fontFamily: 'MontserratRegular' }}>{item.descripcion}</Text>

                        <InputCantidad cantidad={cantPedido} agregar={sumarCant} restar={restarCant} fonts={['MontserratRegular', 'MontserratLight']} />

                        <Text style={{ width: '100%', textAlign: 'center', backgroundColor: 'transparent', fontSize: 18, fontFamily: 'MontserratBold' }}>Total: ${cantPedido * item.precio}</Text>

                        <TouchableOpacity style={{ backgroundColor: '#83A95C', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, marginTop: 15 }} onPress={() => { agregarCarrito(); }}>
                            <Text style={{ fontSize: 17, marginRight: 8, color: '#F4F4F4', fontFamily: 'MontserratSemiBold' }}>Agregar al carrito</Text>
                            <Icon
                                type='material-community'
                                name='cart-plus'
                                color='#F4F4F4'
                                size={26}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    } else {
        return (
            <View style={style.container}>
                <Text>Descuento no encontrado</Text>
            </View>
        );
    }
}