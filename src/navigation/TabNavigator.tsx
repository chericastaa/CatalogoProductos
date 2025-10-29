import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import StackNavigator from './StackNavigator';
import AltaProductoScreen from '../screens/AltaProductoScreen';
import InfoScreen from '../screens/InfoScreen';
import { Producto } from '../types/Producto';
import InicioScreen from '../screens/InicioScreen';

const Tab = createBottomTabNavigator();

type Props = {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
};

export default function TabNavigator({ productos, setProductos }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00796b',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Inicio"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      >
        {(props) => <InicioScreen {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Agregar"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" color={color} size={size} />,
        }}
      >
        {(props) => <AltaProductoScreen {...props} setProductos={setProductos} />}
      </Tab.Screen>

      <Tab.Screen
        name="Info"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" color={color} size={size} />,
        }}
        component={InfoScreen}
      />
    </Tab.Navigator>
  );
}