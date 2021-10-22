import React, { useContext, useState } from 'react';

import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputForm from '../../components/InputForm';
import { AuthContext } from '../../navigation/AuthProvider';
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

    const signUp = async () => {
        if (nombre != '' && usuario != '' && clave != '' && claveRepetida != '') {
            const result = await auth.signUp(nombre, apellido, usuario, clave, claveRepetida);
            if (result.code == 200) {
                setNombre('');
                setApellido('');
                setUsuario('');
                setClave('');
                setClaveRepetida('');
            } else {
                alert('Debe completar los campos obligatorios');
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

    return (
        <KeyboardAwareScrollView>
            <View style={style.personContainer}>
                <Icon
                    type='material-community'
                    name='account-plus'
                    color='black'
                    size={45}
                    style={style.person}
                />
            </View>
            <View style={style.mainContainer}>
                <View style={style.containerRow}>
                    <View style={style.inputRow}>
                        <InputForm
                            value={nombre}
                            label={'Nombre *'}
                            handleChangeText={handleNombre}
                            errorVisible={labelNombreVisible}
                            textAlign={'center'}
                        />
                    </View>
                    <View style={style.inputRow}>
                        <InputForm
                            value={apellido}
                            label={'Apellido'}
                            handleChangeText={handleApellido}
                        />
                    </View>
                </View>

                <InputForm
                    value={usuario}
                    label={'Usuario *'}
                    handleChangeText={handleUsuario}
                    textAlign={'left'}
                    errorVisible={labelUsuarioVisible}
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
                />

            </View>
            <View style={style.mainContainer}>
                <Button
                    title='Registrarse'
                    onPress={signUp}
                    color={'green'}
                />
            </View>
        </KeyboardAwareScrollView >
    );
}