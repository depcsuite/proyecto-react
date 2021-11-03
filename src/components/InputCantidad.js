import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function InputCantidad(props) {

    var cantidad = props.cantidad != undefined ? props.cantidad : 0;

    useEffect(() => { }, []);

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.textUnidades}>Unidades</Text>
            <View style={styles.inputContainer}>
                <IconButton
                    icon={'minus'}
                    onPress={() => { props.restar(); }}
                    disabled={parseInt(cantidad) == 0 ? true : false}
                    size={26}
                />
                <TextInput
                    value={`${cantidad}`}
                    secureTextEntry={false}
                    editable={false}
                    style={{
                        height: 40,
                        color: 'black',
                        textAlign: 'center'
                    }}
                />
                <IconButton
                    icon={'plus'}
                    onPress={() => { props.agregar(); }}
                    size={26}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E8E1D9',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 15
    },
    textUnidades: {
        fontSize: 20,
        paddingLeft: 5
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C8C6C6',
        borderRadius: 100,
        marginVertical: 8
    }
});