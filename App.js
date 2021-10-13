import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/navigation/AuthProvider';

export default function App() {

  return (
    <PaperProvider>
      <AuthProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
