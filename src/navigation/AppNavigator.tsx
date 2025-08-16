import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/use-auth';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SetupScreen } from '../screens/SetupScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { AuthScreen } from '../screens/AuthScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const { authStatus } = useAuth();

  console.log('authStatus -> ', authStatus);

  if (authStatus === 'checking') {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Setup' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};