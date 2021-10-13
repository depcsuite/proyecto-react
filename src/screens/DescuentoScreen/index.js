import React from 'react';
import { Text, View } from 'react-native';
import style from './styles';

export default function DescuentoScreen({ navigation, route: { params }, route }) {

    const item = (params != undefined) ? params.item : null;

    if (item != null) {
        return (
            <View style={style.container}>
                <Text>{item.title}</Text>
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