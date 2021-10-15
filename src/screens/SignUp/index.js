import React, { useContext, useState } from 'react';

import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthContext } from '../../navigation/AuthProvider';

export default function SignUpScreen({ navigation, route }) {

    const { auth } = useContext(AuthContext);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [claveRepetida, setClaveRepetida] = useState('');

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
                console.log(result);
            }
        } else {
            alert('Debe completar los campos obligatorios');
        }
    }

    return (
        <KeyboardAwareScrollView>
            <View>
                <Icon
                    type='material-community'
                    name='twitch'
                    color='black'
                />
            </View>
            <View>
                <Input
                    value={nombre}
                    label='Nombre *'
                    onChangeText={text => setNombre(text)}
                />
                <Input
                    value={apellido}
                    label='Apellido'
                    onChangeText={text => setApellido(text)}
                />
                <Input
                    value={usuario}
                    label='Usuario *'
                    onChangeText={text => setUsuario(text)}
                />
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
                <Button
                    title='Registrarse'
                    onPress={signUp}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}