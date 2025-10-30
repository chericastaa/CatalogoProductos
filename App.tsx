import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { Producto } from './src/types/Producto';
import { productos as productosIniciales } from './src/data/productos';

export default function App() {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);
  const [user, setUser] = useState<{ email: string; nombre: string } | null>(null);
  const [cart, setCart] = useState<{ producto: Producto; cantidad: number }[]>([]);

  return (
    <NavigationContainer>
      <TabNavigator
        productos={productos}
        setProductos={setProductos}
        cart={cart}
        setCart={setCart}
        user={user}
        setUser={setUser}
      />
    </NavigationContainer>
  );
}