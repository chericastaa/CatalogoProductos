import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Producto } from '../types/Producto';
import { RootStackParamList } from '../types/navigation';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Catalogo'>;

type Props = {
  productos: Producto[];
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
};

export default function CatalogoScreen({ productos, setProductos }: Props) {
  const navigation = useNavigation<NavProp>();
  const [busqueda, setBusqueda] = useState('');

  // Buscador en tiempo real
  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return productos;
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda, productos]);

  const renderItem = ({ item }: { item: Producto }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.info}
        onPress={() => navigation.navigate('Detalle', { producto: item })}
      >
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View style={styles.textos}>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.precio}>${item.precio}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => confirmarEliminar(item.id)}>
        <Text style={styles.botonEliminar}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  const confirmarEliminar = (id: string) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => eliminarProducto(id) },
      ]
    );
  };

  const eliminarProducto = (id: string) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo de Productos</Text>

      {/* Buscador */}
      <TextInput
        style={styles.buscador}
        placeholder="Buscar producto..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.sinResultados}>No se encontraron productos</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f6f8fa' },
  titulo: { fontSize: 26, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  buscador: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  info: { flexDirection: 'row', flex: 1 },
  imagen: { width: 60, height: 60, borderRadius: 8 },
  textos: { marginLeft: 12, flex: 1 },
  nombre: { fontSize: 18, fontWeight: '600', color: '#222' },
  precio: { fontSize: 16, color: '#00796b', marginTop: 4 },
  botonEliminar: { fontSize: 20, paddingLeft: 10 },
  sinResultados: { textAlign: 'center', marginTop: 40, color: '#888' },
});