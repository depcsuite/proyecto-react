import React, { useContext, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';

export default function FavoritoScreen({ navigation, route }) {

    const { auth, user } = useContext(AuthContext);

    const { isLoggedIn } = user;

    if (!isLoggedIn) {
        return (
            <View>
                <Text>Iniciar sesión</Text>
                <Button title='Iniciar sesión' onPress={() => auth.logIn(true)} />
            </View>
        );
    } else {
        return (
            <View>
                <Text>Esta es la pantalla de favoritos Israel</Text>
                {isLoggedIn ? <Text>Sesión iniciada</Text> : <></>}
            </View>
        );
    }
}