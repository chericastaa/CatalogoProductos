import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from '../screens/InicioScreen';
import CatalogoScreen from '../screens/CatalogoScreen';
import DetalleScreen from '../screens/DetalleScreen';
import AltaProductoScreen from '../screens/AltaProductoScreen';
import { RootStackParamList } from '../types/navigation';
import { Producto } from '../types/Producto';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
  cart: { producto: Producto; cantidad: number }[];
setCart: React.Dispatch<React.SetStateAction<{ producto: Producto; cantidad: number }[]>>;
};

export default function StackNavigator({ productos, setProductos, cart, setCart }: Props) {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio" component={InicioScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="Catalogo" options={{ title: 'Catálogo' }}>
        {(props) => <CatalogoScreen {...props} productos={productos} setProductos={setProductos} />}
      </Stack.Screen>
      <Stack.Screen name="Detalle" options={{ title: 'Detalle' }}>
  {(props) => (
    <DetalleScreen
      {...props}
      route={props.route}
      cart={cart}
      setCart={setCart}
    />
  )}
</Stack.Screen>
      <Stack.Screen name="AltaProducto">
        {(props) => <AltaProductoScreen {...props} setProductos={setProductos} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}