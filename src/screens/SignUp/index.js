import React, { useContext, useState } from 'react';

import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../navigation/AuthProvider';
import style from './styles';

export default function SignUpScreen({ navigation, route }) {

    const { auth } = useContext(AuthContext);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [claveRepetida, setClaveRepetida] = useState('');

    const [msgAlertView, setMsgAlertView] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');

    const signUp = async () => {
        if (nombre != '' && usuario != '' && clave != '' && claveRepetida != '') {
            const result = await auth.signUp(nombre, apellido, usuario, clave, claveRepetida);
            if (result.code == 210) {
                setNombre('');
                setApellido('');
                setUsuario('');
                setClave('');
                setClaveRepetida('');
            } else {
                setMsgAlertView(true);
            }
        } else {
            setMsgAlertView(true);
            // alert('Debe completar los campos obligatorios');
        }
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
                        <Input
                            value={nombre}
                            label='Nombre *'
                            onChangeText={text => setNombre(text)}
                        />
                        <Text style={{ display: msgAlertView ? 'flex' : 'none' }}>El nombre debe ser obligatorio</Text>
                    </View>
                    <View style={style.inputRow}>
                        <Input
                            value={apellido}
                            label='Apellido'
                            onChangeText={text => setApellido(text)}
                        />
                    </View>
                </View>
                <Input
                    value={usuario}
                    label='Usuario *'
                    onChangeText={text => setUsuario(text)}
                />
                <Text style={{ display: msgAlertView ? 'flex' : 'none' }}>El usuario debe ser obligatorio</Text>
                <Input
                    value={clave}
                    label='Contraseña *'
                    secureTextEntry={true}
                    rightIcon={
                        <Icon
                            type='material-community'
                            name='eye'
                            color='black'
                        />
                    }
                    onChangeText={text => setClave(text)}
                />
                <Text style={{ display: msgAlertView ? 'flex' : 'none' }}>La contraseña debe ser obligatorio</Text>
                <Input
                    value={claveRepetida}
                    label='Repetir contraseña *'
                    secureTextEntry={true}
                    rightIcon={
                        <Icon
                            type='material-community'
                            name='eye'
                            color='black'
                        />
                    }
                    onChangeText={text => setClaveRepetida(text)}
                />
                <Text style={{ display: msgAlertView ? 'flex' : 'none' }}>La contraseña debe ser obligatorio</Text>
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