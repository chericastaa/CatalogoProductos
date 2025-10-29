import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Producto } from '../types/Producto';

type Props = {
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
  navigation: any;
};

export default function AltaProductoScreen({ setProductos, navigation }: Props) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const guardar = () => {
    if (!nombre.trim() || !precio.trim() || !descripcion.trim() || !imagen.trim()) {
      Alert.alert('Faltan datos');
      return;
    }

    const nuevoProducto: Producto = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      precio: Number(precio),
      descripcion: descripcion.trim(),
      imagen: imagen.trim(),
    };

    setProductos((prev) => [nuevoProducto, ...prev]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>URL de imagen</Text>
      <TextInput style={styles.input} value={imagen} onChangeText={setImagen} />

      <Button title="Guardar producto" onPress={guardar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
});