import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types';
import HomeScreen from './src/screens/HomeScreen';
import PublishAdScreen from './src/screens/PublishAdScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import AdDetailScreen from './src/screens/AdDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f8fafc' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Publish" component={PublishAdScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="AdDetail" component={AdDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
