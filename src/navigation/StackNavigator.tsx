import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatalogoScreen from '../screens/CatalogoScreen';
import DetalleScreen from '../screens/DetalleScreen';
import AltaProductoScreen from '../screens/AltaProductoScreen';
import InicioScreen from '../screens/InicioScreen';
import { RootStackParamList } from '../types/navigation';
import { Producto } from '../types/Producto';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
};

export default function StackNavigator({ productos, setProductos }: Props) {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen name="Inicio">
        {(props) => <InicioScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Catalogo" options={{ title: 'Catálogo' }}>
        {(props) => <CatalogoScreen {...props} productos={productos} setProductos={setProductos} />}
      </Stack.Screen>
      <Stack.Screen name="Detalle" component={DetalleScreen} options={{ title: 'Detalle' }} />
      <Stack.Screen name="AltaProducto">
        {(props) => <AltaProductoScreen {...props} setProductos={setProductos} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}