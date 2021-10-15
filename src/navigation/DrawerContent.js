import React, { useContext } from 'react';
import { Linking } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from './AuthProvider';

export default function CustomDrawerContent(props) {

    const { navigation } = props;

    const { user: { isLoggedIn } } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label="Home"
                onPress={() => { navigation.navigate('Home'); }}
            />
            <DrawerItem
                label="Favoritos"
                onPress={() => { navigation.navigate('Favoritos'); }}
            />
            <DrawerItem
                label="Perfil"
                onPress={() => { navigation.navigate('Perfil'); }}
            />
            {isLoggedIn ?
                <DrawerItem
                    label='Cerrar sesión'
                    onPress={() => { console.log('Cerrar sesión'); }}
                />
                :
                <DrawerItem
                    label='Iniciar sesión'
                    onPress={() => { navigation.navigate('AuthDrawerScreen'); }}
                />
            }
        </DrawerContentScrollView>
    );
}
