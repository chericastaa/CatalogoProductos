import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Producto } from '../types/Producto';
import { productos } from '../data/productos';

export default function CatalogoScreen() {
  const renderItem = ({ item }: { item: Producto }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.imagen} />
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.precio}>${item.precio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo de Productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { marginBottom: 16, backgroundColor: '#fff', padding: 12, borderRadius: 8 },
  imagen: { width: 100, height: 100, borderRadius: 8 },
  nombre: { fontSize: 18, fontWeight: '600' },
  precio: { fontSize: 16, color: '#00796b' },
});