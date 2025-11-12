import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Producto } from '../types/Producto';
import { useNavigation } from '@react-navigation/native';

type Props = {
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
};

export default function AltaProductoScreen({ setProductos }: Props) {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const handleGuardar = () => {
    if (!nombre.trim() || !precio.trim() || !descripcion.trim() || !imagen.trim()) {
      Alert.alert('Completá todos los campos');
      return;
    }

    const nuevo: Producto = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      precio: parseInt(precio),
      descripcion: descripcion.trim(),
      imagen: imagen.trim(),
    };

    setProductos(prev => [nuevo, ...prev]);
    Alert.alert('¡Listo!', 'Producto agregado');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Campos en el medio */}
      <View style={styles.formulario}>
        <Text style={styles.titulo}>Agregar producto</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={styles.input}
          placeholder="Precio del producto"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción del producto"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />

        <Text style={styles.label}>URL de imagen</Text>
        <TextInput
          style={styles.input}
          placeholder="https://ejemplo.com/imagen.jpg"
          value={imagen}
          onChangeText={setImagen}
        />
      </View>

      {/* Botón abajo */}
      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
        <Text style={styles.textoBoton}>Guardar producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'space-between', // ← campos arriba, botón abajo
  },
  formulario: {
    flex: 1, // ← ocupa todo el espacio disponible
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  botonGuardar: {
    backgroundColor: '#00796b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24, // ← separado del formulario
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});