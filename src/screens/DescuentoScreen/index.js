import React, { useContext, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import InputCantidad from '../../components/InputCantidad';
import style from './styles';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../../navigation/AuthProvider';
import { NO_IMAGE, REST_BASE_IMAGES } from '../../config/constants';

const { width, height } = Dimensions.get('screen');

export default function DescuentoScreen({ navigation, route: { params }, route }) {

    const item = (params != undefined) ? params.item : null;

    const { actions, data } = useContext(AuthContext);

    const [cantPedido, setCantPedido] = useState(0);
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
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
            let result = await actions.agregarFavorito(item.id);
            if (result != null) {
                if (result == 400) {
                    result = await actions.eliminarFavorito(item.id);
                    setFavorito(false);
                } else {
                    setFavorito(true);
                }
            }
        } catch (e) {
            console.warn(e);
        }
    }

    if (item != null) {
        return (
            <View style={style.container}>
                <Image
                    source={{ uri: item.imagenDetalle != '' ? `${REST_BASE_IMAGES}${item.imagenDetalle}` : `${REST_BASE_IMAGES}${NO_IMAGE}` }}
                    style={{
                        width: width,
                        height: 250,
                        zIndex: 0
                    }}
                />
                <IconButton
                    icon={favorito ? 'heart' : 'heart-outline'}
                    size={26}
                    color={'#000'}
                    onPress={async () => {
                        await handleFavorito();
                    }}
                    style={{
                        alignSelf: 'flex-end',
                        marginEnd: 20,
                        marginVertical: 20
                    }}
                />
                <View style={{ paddingHorizontal: 10 }}>
                    <Title style={{ fontSize: 22 }}>{item.nombre}</Title>

                    <Text style={{ marginTop: 10, fontSize: 17 }}>{item.descripcion}</Text>

                    <InputCantidad cantidad={cantPedido} agregar={sumarCant} restar={restarCant} />

                    <Text style={{ width: '100%', textAlign: 'center', backgroundColor: 'transparent', fontSize: 18, fontWeight: 'bold' }}>Total: ${cantPedido * item.precio}</Text>

                    <TouchableOpacity style={{ backgroundColor: '#83A95C', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, borderRadius: 8, marginTop: 15 }} onPress={() => { agregarCarrito(); }}>
                        <Text style={{ fontSize: 17, marginRight: 8, color: '#F4F4F4' }}>Agregar al carrito</Text>
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
    } else {
        return (
            <View style={style.container}>
                <Text>Descuento no encontrado</Text>
            </View>
        );
    }
}