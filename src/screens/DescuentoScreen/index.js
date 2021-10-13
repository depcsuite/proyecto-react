import React from 'react';
import { Text, View } from 'react-native';
import style from './styles';

export default function DescuentoScreen({ navigation, route }) {

    console.log(route);

    return (
        <View style={style.container}>
            <Text>Pantalla DESCUENTOS</Text>
        </View>
    );
}