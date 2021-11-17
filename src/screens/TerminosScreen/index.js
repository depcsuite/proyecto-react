import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import style from './styles';
import { useFonts } from 'expo-font';

export default function TerminosScreen({ navigation, route }) {

    const [loaded] = useFonts({
        MontserratRegular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratSemiBold: require('../../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    if (!loaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }}
            >
                <ActivityIndicator size='large' color={'#BC2C1A'} />
            </View>
        );
    } else {
        return (
            <Text>Términos y condiciones</Text>
        );
    }
}