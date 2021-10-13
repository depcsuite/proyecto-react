import React from 'react';
import { Linking } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {

    const { navigation } = props;

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
        </DrawerContentScrollView>
    );
}
