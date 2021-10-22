import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../../navigation/AuthProvider';

export default function PerfilScreen({ navigation, route }) {

    const { user, auth } = useContext(AuthContext);
    const { userData } = user;

    if (user.isLoggedIn) {
        return (
            <View>
                <Text>Esta es la pantalla del perfil</Text>
                <View>
                    <View style={{ backgroundColor: '#D5D5D5', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', padding: 15, borderRadius: 500 }}>
                        <Icon
                            type='material-community'
                            name='account'
                            color='black'
                            size={80}
                        />
                    </View>
                    <Text>{userData.nombre}</Text>
                    <Text>{userData.apellido}</Text>
                    <Text>{userData.usuario}</Text>
                </View>
                <Button title='Cerrar sesión' onPress={() => auth.logOut()} />
            </View>
        );
    } else {
        return (
            <View>
                <Text>No tiene la sesión iniciada.</Text>
                <Button title='Iniciar sesión' onPress={() => { navigation.navigate('AuthDrawerScreen'); }} />
            </View>
        );
    }
}