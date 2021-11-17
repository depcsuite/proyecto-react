import React, { useContext } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from './DrawerContent';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import { AuthContext } from './AuthProvider';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

    const { user: { isLoggedIn } } = useContext(AuthContext);

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="HomeDrawerScreen" component={TabNavigator} />
            {isLoggedIn ?
                <></>
                :
                <Drawer.Screen name="AuthDrawerScreen" component={AuthStack} />
            }
        </Drawer.Navigator>
    );
}