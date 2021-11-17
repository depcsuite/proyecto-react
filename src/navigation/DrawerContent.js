import React, { useContext } from 'react';
import { Linking } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from './AuthProvider';
import { Icon } from 'react-native-elements';

export default function CustomDrawerContent(props) {

    const { navigation } = props;

    const { user: { isLoggedIn }, auth, data: { fonts } } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: '#E4222C' }} >
            <DrawerItem
                label="Home"
                onPress={() => { navigation.navigate('Home'); }}
                labelStyle={{ fontFamily: fonts[1], color: 'white' }}
                icon={() => (
                    <Icon
                        type='material-community'
                        name={'home'}
                        size={26}
                        color={'white'}
                    />
                )}
            />
            <DrawerItem
                label="Carrito"
                onPress={() => { navigation.navigate('Carrito'); }}
                labelStyle={{ fontFamily: fonts[1], color: 'white' }}
                icon={() => (
                    <Icon
                        type='material-community'
                        name={'cart'}
                        size={26}
                        color={'white'}
                    />
                )}
            />
            <DrawerItem
                label="Favoritos"
                onPress={() => { navigation.navigate('Favoritos'); }}
                labelStyle={{ fontFamily: fonts[1], color: 'white' }}
                icon={() => (
                    <Icon
                        type='material-community'
                        name={'heart'}
                        size={26}
                        color={'white'}
                    />
                )}
            />
            <DrawerItem
                label="Perfil"
                onPress={() => { navigation.navigate('Perfil'); }}
                labelStyle={{ fontFamily: fonts[1], color: 'white' }}
                icon={() => (
                    <Icon
                        type='material-community'
                        name={'account'}
                        size={26}
                        color={'white'}
                    />
                )}
            />
            <DrawerItem
                label="Legales"
                onPress={() => { navigation.navigate('Home', { screen: 'TerminosStackNavigator' }); }}
                labelStyle={{ fontFamily: fonts[1], color: 'white' }}
                icon={() => (
                    <Icon
                        type='material-community'
                        name={'book-multiple'}
                        size={26}
                        color={'white'}
                    />
                )}
            />
            {isLoggedIn ?
                <DrawerItem
                    label='Cerrar sesión'
                    onPress={() => { auth.logOut(); }}
                    labelStyle={{ fontFamily: fonts[1], color: 'white' }}
                    icon={() => (
                        <Icon
                            type='material-community'
                            name={'logout'}
                            size={26}
                            color={'white'}
                        />
                    )}
                />
                :
                <DrawerItem
                    label='Iniciar sesión'
                    onPress={() => { navigation.navigate('AuthDrawerScreen'); }}
                    labelStyle={{ fontFamily: fonts[1], color: 'white' }}
                    icon={() => (
                        <Icon
                            type='material-community'
                            name={'login'}
                            size={26}
                            color={'white'}
                        />
                    )}
                />
            }
        </DrawerContentScrollView>
    );
}
