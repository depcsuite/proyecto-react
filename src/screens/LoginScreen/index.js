import React, { useContext, useState } from 'react';
import { ActivityIndicator, ImageBackground, Text, View } from 'react-native';
import style from './styles';
import { Icon, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../navigation/AuthProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFonts } from 'expo-font';

export default function LoginScreen({ navigation, route }) {

    const { auth } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');

    const [loading, setLoading] = useState(false);

    const [loaded] = useFonts({
        MontserratRegular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratSemiBold: require('../../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    const logIn = async () => {
        if (usuario == '' || clave == '') {
            alert('Usuario y clave obligatorios');
        } else {
            setLoading(true);
            await auth.logIn({ user: usuario, password: clave });
            setLoading(false);
        }
    }

    if (loading || !loaded) {
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
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} >
                <ImageBackground
                    source={require('../../../assets/bg-login.jpg')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    imageStyle={{ opacity: 0.7 }}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center' }}>
                        <Icon
                            type='material-community'
                            name='account'
                            color='#E4222C'
                            size={70}
                            style={{
                                backgroundColor: 'white',
                                alignSelf: 'center',
                                padding: 20,
                                borderRadius: 200,
                                marginBottom: 45
                            }}
                        />
                        <Input
                            placeholder={'Usuario'}
                            secureTextEntry={false}
                            rightIcon={
                                <Icon
                                    type='material-community'
                                    name='account-box'
                                    color='rgba(255,255,255,0.5)'
                                />
                            }
                            value={usuario}
                            onChangeText={text => setUsuario(text)}
                            inputContainerStyle={style.inputContainerStyle}
                            inputStyle={style.inputStyle}
                            placeholderTextColor={'rgba(255,255,255,0.5)'}
                            style={{
                                color: 'white',
                                fontFamily: 'MontserratRegular'
                            }}
                            rightIconContainerStyle={style.inputIconRight}
                        />
                        <Input
                            placeholder={'Contraseña'}
                            secureTextEntry={showPassword ? false : true}
                            rightIcon={
                                <Icon
                                    type='material-community'
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    color='rgba(255,255,255,0.5)'
                                    style={style.inputIconRight}
                                    onPress={() => {
                                        setShowPassword(prevValue => !prevValue);
                                    }}
                                />
                            }
                            value={clave}
                            onChangeText={text => setClave(text)}
                            inputContainerStyle={style.inputContainerStyle}
                            inputStyle={style.inputStyle}
                            placeholderTextColor={'rgba(255,255,255,0.5)'}
                            style={{
                                color: 'white',
                                fontFamily: 'MontserratRegular'
                            }}
                            rightIconContainerStyle={style.inputIconRight}
                        />
                        <TouchableOpacity
                            onPress={logIn}
                            style={style.btnLogin}
                        >
                            <Text style={[style.btnLoginText, { fontFamily: 'MontserratSemiBold' }]}>Iniciar sesión</Text>
                        </TouchableOpacity>
                        <View style={style.containerRegistro}>
                            <Text style={[style.textRegistro, { fontFamily: 'MontserratRegular' }]}>¿No tenés cuenta?</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate('AuthDrawerScreen', { screen: 'AuthStackSignUpScreen' }); }} style={{ marginStart: 5 }}>
                                <Text style={[style.textRegistro, { fontFamily: 'MontserratSemiBold' }]}>Crea una nueva ahora</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView>
        );
    }
}