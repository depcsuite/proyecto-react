import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';

// PANTALLAS
import HomeScreen from '../screens/HomeScreen';
import DescuentoScreen from '../screens/DescuentoScreen';

import CarritoScreen from '../screens/CarritoScreen';

import FavoritoScreen from '../screens/FavoritoScreen';

import PerfilScreen from '../screens/PerfilScreen';
import TerminosScreen from '../screens/TerminosScreen';
import CarritoConfirmScreen from '../screens/ConfirmacionScreen';
// =====================

const Stack = createStackNavigator();

function MainStackNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='HomeStackNavigator'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#E4222C'
                },
                headerTitleStyle: {
                    color: 'white'
                },
            }}
        >
            <Stack.Screen
                name='HomeStackNavigator'
                component={HomeScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            onPress={() => navigation.openDrawer()}
                            icon="menu"
                            color={'white'}
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
            <Stack.Screen
                name='TerminosStackNavigator'
                component={TerminosScreen}
                options={{
                    title: 'Términos y condiciones'
                }}
            />
        </Stack.Navigator>
    );
}

function CarritoStackNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='CarritoStackNavigator'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#E4222C'
                },
                headerTitleStyle: {
                    color: 'white'
                },
            }}
        >
            <Stack.Screen
                name='CarritoStackNavigator'
                component={CarritoScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            onPress={() => navigation.openDrawer()}
                            icon="menu"
                            color={'white'}
                        />
                    ),
                    title: 'MiAPP - Carrito',
                }}
            />
            <Stack.Screen
                name='CarritoConfirmacionStackNavigator'
                component={CarritoConfirmScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            onPress={() => navigation.goBack()}
                            icon="arrow-left"
                            color={'white'}
                        />
                    ),
                    title: 'MiAPP - Confirmación',
                }}
            />
        </Stack.Navigator>
    );
}

function FavoritoStackNavigator({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='FavoritoStackNavigator'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#E4222C'
                },
                headerTitleStyle: {
                    color: 'white'
                },
            }}
        >
            <Stack.Screen
                name='FavoritoStackNavigator'
                component={FavoritoScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            onPress={() => navigation.openDrawer()}
                            icon="menu"
                            color={'white'}
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
        <Stack.Navigator
            initialRouteName='PerfilStackNavigator'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#E4222C'
                },
                headerTitleStyle: {
                    color: 'white'
                },
            }}
        >
            <Stack.Screen
                name='PerfilStackNavigator'
                component={PerfilScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            onPress={() => navigation.openDrawer()}
                            icon="menu"
                            color={'white'}
                        />
                    ),
                    title: 'MiAPP - Perfil'
                }}
            />
        </Stack.Navigator>
    );
}

export { MainStackNavigator, CarritoStackNavigator, FavoritoStackNavigator, PerfilStackNavigator };