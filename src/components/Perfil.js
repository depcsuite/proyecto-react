import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

export default function Perfil({ user }) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.containerIcon}>
                <Icon
                    type='material-community'
                    name='account'
                    color='black'
                    size={80}
                />
            </View>
            <View>
                <Text style={styles.nombreStyle}>{user.apellido != null && user.apellido != '' ? `${user.nombre} ${user.apellido}` : user.nombre}</Text>
                <Text style={styles.userStyle}>{user.usuario}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#F4F4F4',
        margin: 20,
        padding: 20,
        borderColor: '#A6A9B6',
        borderWidth: 3,
        borderRadius: 10
    },
    containerIcon: {
        backgroundColor: '#D5D5D5',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 15,
        borderRadius: 500,
        borderColor: '#A6A9B6',
        borderWidth: 3,
        marginBottom: 20
    },
    nombreStyle: {
        textAlign: 'center',
        width: '100%',
        fontSize: 17,
        lineHeight: 22.5
    },
    userStyle: {
        textAlign: 'center',
        width: '100%',
        fontSize: 15,
        lineHeight: 21
    }
});