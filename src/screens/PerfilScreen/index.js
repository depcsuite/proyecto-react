import React, { useContext } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Perfil from '../../components/Perfil';
import { AuthContext } from '../../navigation/AuthProvider';
import styles from './styles';
import { useFonts } from 'expo-font';

export default function PerfilScreen({ navigation, route }) {

    const { user, auth } = useContext(AuthContext);
    const { userData } = user;

    const [loaded] = useFonts({
        MontserratSemiBold: require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
        MontserratRegular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratLight: require('../../../assets/fonts/Montserrat-Light.ttf')
    });

    if (user.isLoggedIn) {
        return (
            <View style={styles.mainContainer}>
                <Perfil user={userData} fonts={['MontserratLight', 'MontserratRegular', 'MontserratSemiBold']} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#E4222C',
                            borderRadius: 8
                        }}
                        onPress={() => { auth.logOut() }}
                    >
                        <Text style={{ fontFamily: 'MontserratSemiBold', color: 'white', textAlign: 'center', paddingVertical: 10 }}>CERRAR SESIÓN</Text>
                    </TouchableOpacity>
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