import React from 'react';
import { Button, Text, View } from 'react-native';
import style from './styles';

export default function HomeScreen({ navigation }) {
    return (
        <View style={style.container}>
            <Text>Pantalla HOME</Text>
            <Button onPress={() => navigation.navigate('DescuentoStackNavigator')} title='Ir a la página de DESCUENTOS' />
        </View>
    );
}