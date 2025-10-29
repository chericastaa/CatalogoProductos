import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import { Producto } from './src/types/Producto';
import { productos as productosIniciales } from './src/data/productos';

export default function App() {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);

  return (
    <NavigationContainer>
      <TabNavigator productos={productos} setProductos={setProductos} />
    </NavigationContainer>
  );
}