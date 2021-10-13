import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './DrawerContent';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="HomeDrawerScreen" component={TabNavigator} />
        </Drawer.Navigator>
    );
}