import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Producto } from '../types/Producto';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Detalle'>;

export default function BusquedaScreen({ productos }: { productos: Producto[] }) {
  const [query, setQuery] = useState('');
  const navigation = useNavigation<Nav>();

  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
  );

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
          >
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
          </TouchableOpacity>
        )}
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
    padding: 10,
    marginBottom: 16,
  },
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  nombre: { fontSize: 16, fontWeight: '600' },
  precio: { color: '#00796b', marginTop: 4 },
});