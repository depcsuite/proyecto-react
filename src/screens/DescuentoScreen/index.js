import React, { useContext, useState } from 'react';
import { Image } from 'react-native';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper';
import InputCantidad from '../../components/InputCantidad';
import style from './styles';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../../navigation/AuthProvider';

const { width, height } = Dimensions.get('screen');

export default function DescuentoScreen({ navigation, route: { params }, route }) {

    const item = (params != undefined) ? params.item : null;

    const { actions, data } = useContext(AuthContext);

    const [cantPedido, setCantPedido] = useState(0);

    useState(() => {
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
        console.log(data.carrito);
    }

    if (item != null) {
        return (
            <View style={style.container}>
                <Image
                    source={{ uri: item.imagenDetalle }}
                    style={{
                        width: width,
                        height: 250,
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