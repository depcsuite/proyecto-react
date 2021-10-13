import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { AuthContext } from '../../navigation/AuthProvider';

export default function PerfilScreen({ navigation, route }) {

    const { user, auth } = useContext(AuthContext);

    if (user.isLoggedIn) {
        return (
            <View>
                <Text>Esta es la pantalla del perfil</Text>
                {user.isLoggedIn ? <Text>Sesión iniciada</Text> : <></>}
                <Button title='Cerrar sesión' onPress={() => auth.signUp()} />
            </View>
        );
    } else {
        return (
            <View>
                <Text>Iniciar sesión</Text>
                <Button title='Iniciar sesión' onPress={async () => await auth.logIn(true)} />
            </View>
        );
    }
}