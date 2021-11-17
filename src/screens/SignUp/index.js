import React, { useContext, useState } from 'react';

import { Text, View, TouchableOpacity, Button, ActivityIndicator, ImageBackground, Dimensions } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputForm from '../../components/InputForm';
import { AuthContext } from '../../navigation/AuthProvider';
import { useFonts } from 'expo-font';
import style from './styles';

export default function SignUpScreen({ navigation, route }) {

    const { auth } = useContext(AuthContext);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [claveRepetida, setClaveRepetida] = useState('');

    const [textVisible, setTextVisible] = useState(false);
    const [textVisibleR, setTextVisibleR] = useState(false);

    const [labelNombreVisible, setLabelNombreVisible] = useState(false);
    const [labelUsuarioVisible, setLabelUsuarioVisible] = useState(false);
    const [labelClaveVisible, setLabelClaveVisible] = useState(false);
    const [labelClaveRVisible, setLabelClaveRVisible] = useState(false);

    const [loaded] = useFonts({
        MontserratRegular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
        MontserratSemiBold: require('../../../assets/fonts/Montserrat-SemiBold.ttf')
    });

    const signUp = async () => {
        if (nombre != '' && usuario != '' && clave != '' && claveRepetida != '') {
            const result = await auth.signUp(nombre, apellido, usuario, clave, claveRepetida);
            if (result.code == 200) {
                setNombre('');
                setApellido('');
                setUsuario('');
                setClave('');
                setClaveRepetida('');
                navigation.navigate('AuthStackLoginScreen');
            } else {
                alert(result.msg);
            }
        } else {
            setLabelNombreVisible(true);
            setLabelUsuarioVisible(true);
            setLabelClaveVisible(true);
            setLabelClaveRVisible(true);
        }
    }

    const handleNombre = (e) => {
        if (labelNombreVisible) {
            if (e != '') {
                setLabelNombreVisible(false);
            }
        }
        setNombre(e);
    }

    const handleApellido = (e) => {
        setApellido(e);
    }

    const handleUsuario = (e) => {
        if (labelUsuarioVisible) {
            if (e != '') {
                setLabelUsuarioVisible(false);
            }
        }
        setUsuario(e);
    }

    const handleClave = (e) => {
        if (labelClaveVisible) {
            if (e != '') {
                setLabelClaveVisible(false);
            }
        }
        setClave(e);
    }

    const handleClaveR = (e) => {
        if (labelClaveRVisible) {
            if (e != '') {
                setLabelClaveRVisible(false);
            }
        }
        setClaveRepetida(e);
    }

    const handleVisibility = () => {
        setTextVisible(prevValue => !prevValue);
    }

    const handleVisibilityR = () => {
        setTextVisibleR(prevValue => !prevValue);
    }

    if (!loaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={'black'} />
            </View>
        );
    } else {
        return (
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../assets/bg-login.jpg')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    imageStyle={{ opacity: 0.7 }}
                >
                    <View style={{
                        width: Dimensions.get('screen').width,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        height: 120,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingStart: 20
                    }}>
                        <Icon
                            type='material-community'
                            name='arrow-left'
                            color='white'
                            size={30}
                            onPress={() => { navigation.goBack() }}
                        />
                    </View>
                    <View style={style.personContainer}>
                        <Icon
                            type='material-community'
                            name='account-plus'
                            color='#E4222C'
                            size={70}
                            style={style.person}
                        />
                    </View>
                    <View style={style.mainContainer}>
                        <InputForm
                            value={nombre}
                            label={'Nombre *'}
                            handleChangeText={handleNombre}
                            errorVisible={labelNombreVisible}
                            textAlign={'left'}
                            style={{ fontFamily: 'MontserratRegular' }}
                        />

                        <InputForm
                            value={apellido}
                            label={'Apellido'}
                            handleChangeText={handleApellido}
                            style={{ fontFamily: 'MontserratRegular' }}
                        />

                        <InputForm
                            value={usuario}
                            label={'Usuario *'}
                            handleChangeText={handleUsuario}
                            textAlign={'left'}
                            errorVisible={labelUsuarioVisible}
                            style={{ fontFamily: 'MontserratRegular' }}
                        />

                        <InputForm
                            value={clave}
                            label={'Contraseña *'}
                            handleChangeText={handleClave}
                            textAlign={'left'}
                            errorVisible={labelClaveVisible}
                            icon={textVisible ? 'eye-off' : 'eye'}
                            secureTextEntry={!textVisible}
                            changeTextVisibility={handleVisibility}
                            style={{ fontFamily: 'MontserratRegular' }}
                        />

                        <InputForm
                            value={claveRepetida}
                            label={'Repetir contraseña *'}
                            handleChangeText={handleClaveR}
                            textAlign={'left'}
                            errorVisible={labelClaveRVisible}
                            icon={textVisibleR ? 'eye-off' : 'eye'}
                            secureTextEntry={!textVisibleR}
                            changeTextVisibility={handleVisibilityR}
                            style={{ fontFamily: 'MontserratRegular' }}
                        />

                    </View>
                    <View style={style.mainContainer}>
                        <TouchableOpacity style={style.btnRegistrarse} onPress={signUp}>
                            <Text style={[style.btnRegistroText, { fontFamily: 'MontserratSemiBold' }]}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAwareScrollView >
        );
    }
}