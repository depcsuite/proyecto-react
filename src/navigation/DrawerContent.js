import React from 'react';
import { Linking } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {

    const { navigation } = props;

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Home"
                onPress={() => { navigation.navigate('HomeStackNavigator'); }}
            />
            <DrawerItem
                label="Favoritos"
                onPress={() => { navigation.navigate('FavoritoStackNavigator'); }}
            />
            <DrawerItem
                label="Perfil"
                onPress={() => { navigation.navigate('PerfilStackNavigator'); }}
            />
        </DrawerContentScrollView>
    );
}
