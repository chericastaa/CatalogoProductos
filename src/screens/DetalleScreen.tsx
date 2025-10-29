import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetalleScreen({ route }: any) {
  const { producto } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />
      <Text style={styles.nombre}>{producto.nombre}</Text>
      <Text style={styles.precio}>${producto.precio}</Text>
      <Text style={styles.descripcion}>{producto.descripcion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  imagen: { width: '100%', height: 250, borderRadius: 12 },
  nombre: { fontSize: 24, fontWeight: 'bold', marginTop: 16 },
  precio: { fontSize: 20, color: '#00796b', marginTop: 8 },
  descripcion: { fontSize: 16, marginTop: 12, color: '#555' },
});