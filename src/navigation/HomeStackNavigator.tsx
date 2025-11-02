import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioScreen from '../screens/InicioScreen';
import DetalleScreen from '../screens/DetalleScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from '../types/navigation';
import { Producto } from '../types/Producto';
import { StackParamList } from '../types/StackParamList';
import FinalizarCompraScreen from '../screens/FinalizarCompraScreen';

const Stack = createNativeStackNavigator<StackParamList>();

type Props = {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
  cart: { producto: Producto; cantidad: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ producto: Producto; cantidad: number }[]>>;
  user: { email: string; nombre: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ email: string; nombre: string } | null>>;
  onFinalizar: () => void;
};

export default function HomeStackNavigator({
  productos,
  setProductos,
  cart,
  setCart,
  user,
  setUser,
  onFinalizar,
}: Props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={InicioScreen} options={{ title: 'Inicio' }} />

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

      <Stack.Screen name="Login" options={{ title: 'Iniciar sesión' }}>
        {(props) => <LoginScreen {...props} onLogin={setUser} />}
      </Stack.Screen>
      <Stack.Screen name="FinalizarCompra">
        {(props) => <FinalizarCompraScreen {...props} cart={cart} user={user} onFinalizar={onFinalizar} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}