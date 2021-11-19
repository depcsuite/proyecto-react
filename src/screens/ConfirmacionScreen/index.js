import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';
import { useFonts } from 'expo-font';
import { Icon } from 'react-native-elements';

export default function CarritoConfirmScreen({ navigation, route }) {

    const { data: { carrito }, actions: { registrarPedido } } = useContext(AuthContext);

    const [successView, setSuccessView] = useState(false);
    const [errorView, setErrorView] = useState(false);

    const [loaded] = useFonts({
        MontserratRegular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratSemiBold: require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
        MontserratBold: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    });

    const enviarPedido = () => {
        let result = registrarPedido();
        if (result <= 500) {
            setSuccessView(true);
        } else {
            setErrorView(true);
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.containerItem}>
                <View style={styles.containerText}>
                    <Text style={styles.titleDescr}>Producto: </Text>
                    <Text style={styles.descr}>{item.nombre}</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.titleDescr}>Cantidad: </Text>
                    <Text style={styles.descr}>{item.cantidad}</Text>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.titleDescr}>Subtotal: </Text>
                    <Text style={styles.descr}>$ {item.cantidad * item.precio}</Text>
                </View>
            </View>
        );
    }

    if (successView) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'green' }}>
                <View style={{ backgroundColor: 'white', padding: 20, alignSelf: 'center', borderRadius: 200, marginBottom: 30 }}>
                    <Icon
                        name={'check'}
                        size={60}
                        color={'black'}
                    />
                </View>
                <Text style={{ fontFamily: 'MontserratSemiBold', fontSize: 26, textAlign: 'center', color: 'white' }}>Pedido enviado correctamente...</Text>
            </View>
        );
    }

    if (errorView) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'red' }}>
                <View style={{ backgroundColor: 'white', padding: 20, alignSelf: 'center', borderRadius: 200, marginBottom: 30 }}>
                    <Icon
                        name={'clear'}
                        size={60}
                        color={'black'}
                    />
                </View>
                <Text style={{ fontFamily: 'MontserratSemiBold', fontSize: 26, textAlign: 'center', color: 'white' }}>Ha ocurrido un error al enviar el pedido.</Text>
            </View>
        );
    }

    return (
        <FlatList
            ListFooterComponent={
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalLabel}>$ {route.params.total}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnEnviar} onPress={enviarPedido}>
                        <Text style={styles.btnEnviarLabel}>Enviar pedido</Text>
                    </TouchableOpacity>
                </View>
            }
            data={carrito}
            horizontal={false}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            style={{
                backgroundColor: 'white',
                paddingTop: 12,
                paddingHorizontal: 12
            }}
        />
    );
}

const styles = StyleSheet.create({
    containerItem: {
        backgroundColor: '#EDEDED',
        padding: 16,
        marginBottom: 12,
        borderRadius: 8
    },
    containerText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    titleDescr: {
        fontSize: 16,
        lineHeight: 22,
        color: '#181818',
        fontFamily: 'MontserratSemiBold',
        alignSelf: 'center'
    },
    descr: {
        fontSize: 15,
        lineHeight: 22,
        color: '#707070',
        fontFamily: 'MontserratRegular',
        alignSelf: 'center'
    },
    totalLabel: {
        fontFamily: 'MontserratBold',
        fontSize: 18,
        lineHeight: 23,
        alignSelf: 'center'
    },
    btnEnviar: {
        backgroundColor: '#E4222C', borderRadius: 8, alignSelf: 'center', justifyContent: 'center', marginTop: 25
    },
    btnEnviarLabel: {
        color: 'white', fontFamily: 'MontserratSemiBold', fontSize: 16, lineHeight: 22, paddingVertical: 6, paddingHorizontal: 55
    }
});