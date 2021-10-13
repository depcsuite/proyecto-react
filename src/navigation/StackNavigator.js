import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

// PANTALLAS
import HomeScreen from '../screens/HomeScreen';
import DescuentoScreen from '../screens/DescuentoScreen';

import CarritoScreen from '../screens/CarritoScreen';

import FavoritoScreen from '../screens/FavoritoScreen';

import PerfilScreen from '../screens/PerfilScreen';
// =====================

const Stack = createStackNavigator();

function MainStackNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='HomeStackNavigator'>
            <Stack.Screen
                name='HomeStackNavigator'
                component={HomeScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            onPress={() => navigation.openDrawer()}
                            icon="menu"
                            color={'#000'}
                        />
                    ),
                    title: 'MiAPP - Home'
                }}
            />
            <Stack.Screen
                name='DescuentoStackNavigator'
                component={DescuentoScreen}
                options={{
                    title: 'MiAPP - Descuentos'
                }}
            />
        </Stack.Navigator>
    );
}

function CarritoStackNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='CarritoStackNavigator'>
            <Stack.Screen
                name='CarritoStackNavigator'
                component={CarritoScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            onPress={() => navigation.openDrawer()}
                            icon="menu"
                            color={'#000'}
                        />
                    ),
                    title: 'MiAPP - Carrito'
                }}
            />
        </Stack.Navigator>
    );
}

function FavoritoStackNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='FavoritoStackNavigator'>
            <Stack.Screen
                name='FavoritoStackNavigator'
                component={FavoritoScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            onPress={() => navigation.openDrawer()}
                            icon="menu"
                            color={'#000'}
                        />
                    ),
                    title: 'MiAPP - Favoritos'
                }}
            />
        </Stack.Navigator>
    );
}

function PerfilStackNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='PerfilStackNavigator'>
            <Stack.Screen
                name='PerfilStackNavigator'
                component={PerfilScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            onPress={() => navigation.openDrawer()}
                            icon="menu"
                            color={'#000'}
                        />
                    ),
                    title: 'MiAPP - Perfil'
                }}
            />
        </Stack.Navigator>
    );
}

export { MainStackNavigator, CarritoStackNavigator, FavoritoStackNavigator, PerfilStackNavigator };