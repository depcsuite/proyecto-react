import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUp';

const Stack = createStackNavigator();

export default function AuthStack({ route, navigation }) {
    return (
        <Stack.Navigator
            initialRouteName='AuthStackLoginScreen'
        >
            <Stack.Screen name='AuthStackLoginScreen' component={LoginScreen} />
            <Stack.Screen name='AuthStackSignUpScreen' component={SignUpScreen} options={{ title: 'Registro', headerTitleAlign: 'center' }} />
        </Stack.Navigator>
    );
}