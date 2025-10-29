import React, { useState } from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { Producto } from './src/types/Producto';
import { productos as productosIniciales } from './src/data/productos';

export default function App() {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales);

  return <StackNavigator productos={productos} setProductos={setProductos} />;
}