import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import CatalogoScreen from '../screens/CatalogoScreen';
import DetalleScreen from '../screens/DetalleScreen';
import AltaProductoScreen from '../screens/AltaProductoScreen';
import { RootStackParamList } from '../types/navigation';
import { Producto } from '../types/Producto';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
};

export default function StackNavigator({ productos, setProductos }: Props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Catalogo">
        <Stack.Screen
          name="Catalogo"
          options={({ navigation }) => ({
            title: 'Catálogo',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('AltaProducto')}>
                <Text style={{ fontSize: 24, marginRight: 16 }}>+</Text>
              </TouchableOpacity>
            ),
          })}
        >
          {(props) => <CatalogoScreen {...props} productos={productos} setProductos={setProductos} />}
        </Stack.Screen>
        <Stack.Screen name="Detalle" component={DetalleScreen} options={{ title: 'Detalle' }} />
        <Stack.Screen name="AltaProducto">
          {(props) => <AltaProductoScreen {...props} setProductos={setProductos} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}