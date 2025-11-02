import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Producto } from '../types/Producto';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Detalle'>;

type Props = {
  productos: Producto[];
  cart: { producto: Producto; cantidad: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ producto: Producto; cantidad: number }[]>>;
};

export default function BusquedaScreen({ productos, cart, setCart }: Props) {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
  );

  const agregarAlCarrito = (producto: Producto) => {
    if (!cart) {
      alert('El carrito no está listo');
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
    alert(`${producto.nombre} agregado al carrito`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar productos..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filtrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalle', { producto: item })}
            onLongPress={() => agregarAlCarrito(item)}
          >
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No se encontraron productos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  nombre: { fontSize: 16, fontWeight: '600' },
  precio: { color: '#00796b', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' },
});