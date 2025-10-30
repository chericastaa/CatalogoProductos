import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BusquedaScreen from '../screens/BusquedaScreen';
import DetalleScreen from '../screens/DetalleScreen';
import { Producto } from '../types/Producto';

const Stack = createNativeStackNavigator();

type Props = {
  productos: Producto[];
};

export default function BusquedaStackNavigator({ productos }: Props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Busqueda">
        {(props) => <BusquedaScreen {...props} productos={productos} />}
      </Stack.Screen>
      <Stack.Screen name="Detalle" component={DetalleScreen} options={{ title: 'Detalle' }} />
    </Stack.Navigator>
  );
}