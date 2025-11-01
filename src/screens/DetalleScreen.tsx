import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { Producto } from '../types/Producto';

type DetalleRouteProp = RouteProp<RootStackParamList, 'Detalle'>;

type Props = {
  route: DetalleRouteProp;
  cart: { producto: Producto; cantidad: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ producto: Producto; cantidad: number }[]>>;
};

export default function DetalleScreen({ route, cart, setCart }: Props) {
  const { producto } = route.params;

  const agregarAlCarrito = () => {
    if (!cart) {
      Alert.alert('Error', 'El carrito no está listo');
      return;
    }

    const existente = cart.find(item => item.producto.id === producto.id);
    if (existente) {
      setCart(prev =>
        prev.map(item =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCart(prev => [...prev, { producto, cantidad: 1 }]);
    }
    Alert.alert('¡Listo!', `${producto.nombre} se agregó al carrito`);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      <Text style={styles.nombre}>{producto.nombre}</Text>
      <Text style={styles.precio}>${producto.precio}</Text>
      <Text style={styles.descripcion}>{producto.descripcion}</Text>

      <TouchableOpacity style={styles.boton} onPress={agregarAlCarrito}>
        <Text style={styles.textoBoton}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  imagen: { width: '100%', height: 250, borderRadius: 12 },
  nombre: { fontSize: 24, fontWeight: 'bold', marginTop: 16 },
  precio: { fontSize: 20, color: '#00796b', marginTop: 8 },
  descripcion: { fontSize: 16, marginTop: 12, color: '#555' },
  boton: {
    backgroundColor: '#00796b',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  textoBoton: { color: '#fff', fontSize: 16, fontWeight: '600' },
});