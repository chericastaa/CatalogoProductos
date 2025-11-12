import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BusquedaScreen from '../screens/BusquedaScreen';
import DetalleScreen from '../screens/DetalleScreen';
import { BusquedaStackParamList } from '../types/navigation';
import { Producto } from '../types/Producto';

const Stack = createNativeStackNavigator<BusquedaStackParamList>();

type Props = {
  productos: Producto[];
  cart: { producto: Producto; cantidad: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ producto: Producto; cantidad: number }[]>>;
  user: { email: string; nombre: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ email: string; nombre: string } | null>>;
};

export default function BusquedaStackNavigator({ productos, cart, setCart, user, setUser }: Props) {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen name="Busqueda">
        {(props) => <BusquedaScreen {...props} productos={productos} cart={cart} setCart={setCart} />}
      </Stack.Screen>
      <Stack.Screen name="Detalle" options={{ title: 'Detalle' }} >
        {(props) => <DetalleScreen {...props} cart={cart} setCart={setCart} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}