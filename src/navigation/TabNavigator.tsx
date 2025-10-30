import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Producto } from '../types/Producto';
import HomeStackNavigator from './HomeStackNavigator';
import BusquedaStackNavigator from './BusquedaStackNavigator';
import AltaProductoScreen from '../screens/AltaProductoScreen';
import InfoScreen from '../screens/InfoScreen';
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator();

type Props = {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
  cart: { producto: Producto; cantidad: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ producto: Producto; cantidad: number }[]>>;
};

export default function TabNavigator({
  productos,
  setProductos,
  cart,
  setCart,
}: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00796b',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="InicioTab"
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
        component={HomeStackNavigator}
      />

      <Tab.Screen
        name="BusquedaTab"
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        }}
      >
        {(props) => <BusquedaStackNavigator {...props} productos={productos} />}
      </Tab.Screen>

      <Tab.Screen
        name="AgregarTab"
        options={{
          tabBarLabel: 'Agregar',
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" color={color} size={size} />,
        }}
      >
        {(props) => <AltaProductoScreen {...props} setProductos={setProductos} />}
      </Tab.Screen>

      <Tab.Screen
  name="Carrito"
  options={{
    tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
  }}
>
  {(props) => <CartScreen {...props} cart={cart} setCart={setCart} />}
</Tab.Screen>

      <Tab.Screen
        name="InfoTab"
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: ({ color, size }) => <Ionicons name="information-circle" color={color} size={size} />,
        }}
        component={InfoScreen}
      />
    </Tab.Navigator>
  );
}