import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { MainStackNavigator, CarritoStackNavigator, FavoritoStackNavigator, PerfilStackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name='Home'
                component={MainStackNavigator}
                options={{
                    tabBarLabel: 'HOME',
                    tabBarIcon: (({ focused }) => {
                        if (focused)
                            return <MaterialIcons name='home' color='#1C3738' size={33} />
                        else
                            return <MaterialIcons name='home' color='#9D9D9D' size={28} />
                    }),
                    tabBarActiveTintColor: '#1C3738',
                    tabBarInactiveTintColor: '#9D9D9D'
                }}
                listeners={{
                    tabPress: e => {
                        navigation.navigate('Home', { screen: 'HomeStackNavigator' });
                    }
                }}
            />
            <Tab.Screen
                name='Carrito'
                component={CarritoStackNavigator}
                options={{
                    tabBarLabel: 'CARRITO',
                    tabBarIcon: (({ focused }) => {
                        return <MaterialIcons name='shopping-cart' color={focused ? '#55868C' : '#9D9D9D'} size={focused ? 33 : 28} />
                    }),
                    tabBarActiveTintColor: '#1C3738',
                    tabBarInactiveTintColor: '#9D9D9D'
                }}
            />
            <Tab.Screen
                name='Favoritos'
                component={FavoritoStackNavigator}
                options={{
                    tabBarLabel: 'FAVORITOS',
                    tabBarIcon: (({ focused }) => {
                        if (focused)
                            return <MaterialIcons name='favorite' color='#DF2935' size={33} />
                        else
                            return <MaterialIcons name='favorite' color='#9D9D9D' size={28} />
                    }),
                    tabBarActiveTintColor: '#1C3738',
                    tabBarInactiveTintColor: '#9D9D9D'
                }}
            />
            <Tab.Screen
                name='Perfil'
                component={PerfilStackNavigator}
                options={{
                    tabBarLabel: 'PERFIL',
                    tabBarIcon: (({ focused }) => {
                        if (focused)
                            return <MaterialIcons name='person' color='#2D7AC0' size={33} />
                        else
                            return <MaterialIcons name='person' color='#9D9D9D' size={28} />
                    }),
                    tabBarActiveTintColor: '#1C3738',
                    tabBarInactiveTintColor: '#9D9D9D'
                }}
            />
        </Tab.Navigator>
    );
}