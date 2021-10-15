import React, { useContext, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import style from './styles';
import { Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../navigation/AuthProvider';

export default function LoginScreen({ navigation, route }) {

    const { auth } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');

    const [loading, setLoading] = useState(false);

    const logIn = async () => {
        if (usuario == '' || clave == '') {
            alert('Usuario y clave obligatorios');
        } else {
            setLoading(true);
            setTimeout(async function () {
                await auth.logIn(true);
                setLoading(false);
            }, 2000);
        }
    }

    if (loading) {
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
            <View style={style.container}>
                <View>
                    <Icon
                        type='material-community'
                        name='twitch'
                        color='black'
                    />
                    <Input
                        placeholder={'Usuario'}
                        secureTextEntry={false}
                        rightIcon={
                            <Icon
                                type='material-community'
                                name='penguin'
                                color='black'
                            />
                        }
                        value={usuario}
                        onChangeText={text => setUsuario(text)}
                    />
                    <Input
                        placeholder={'Contraseña'}
                        secureTextEntry={showPassword ? false : true}
                        rightIcon={
                            <Icon
                                type='material-community'
                                name={showPassword ? 'eye-off' : 'eye'}
                                color='black'
                                onPress={() => {
                                    setShowPassword(prevValue => !prevValue);
                                }}
                            />
                        }
                        value={clave}
                        onChangeText={text => setClave(text)}
                    />
                    <TouchableOpacity
                        onPress={logIn}
                    >
                        <Text>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>¿No tenés cuenta? <TouchableOpacity onPress={() => { navigation.navigate('AuthDrawerScreen', { screen: 'AuthStackSignUpScreen' }); }}><Text>Crea una nueva ahora</Text></TouchableOpacity></Text>
                </View>
            </View>
        );
    }
}