import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from '../screens/InicioScreen';
import DetalleScreen from '../screens/DetalleScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={InicioScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="Detalle" component={DetalleScreen} options={{ title: 'Detalle' }} />
    </Stack.Navigator>
  );
}