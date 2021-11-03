import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Perfil from '../../components/Perfil';
import { AuthContext } from '../../navigation/AuthProvider';
import styles from './styles';

export default function PerfilScreen({ navigation, route }) {

    const { user, auth } = useContext(AuthContext);
    const { userData } = user;

    if (user.isLoggedIn) {
        return (
            <View style={styles.mainContainer}>
                <Perfil user={userData} />
                <View style={styles.buttonContainer}>
                    <Button color={'#FF2626'} title='Cerrar sesión' onPress={() => auth.logOut()} />
                </View>
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