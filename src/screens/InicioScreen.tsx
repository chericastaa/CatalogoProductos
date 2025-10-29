import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Producto } from '../types/Producto';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const destacados: Producto[] = [
  {
    id: '1',
    nombre: 'Auriculares Bluetooth',
    precio: 15000,
    descripcion: 'Con noise cancelling',
    imagen: 'https://picsum.photos/200/200?random=1',
  },
  {
    id: '2',
    nombre: 'Teclado Mecánico',
    precio: 25000,
    descripcion: 'RGB con switches rojos',
    imagen: 'https://picsum.photos/200/200?random=2',
  },
  {
    id: '3',
    nombre: 'Mouse Gamer',
    precio: 8000,
    descripcion: 'RGB y 12000 DPI',
    imagen: 'https://picsum.photos/200/200?random=3',
  },
];

const images = destacados.map(p => p.imagen);

const { width } = Dimensions.get('window');

type Props = {
  navigation: any;
};

export default function InicioScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {destacados.map((p) => (
            <Image key={p.id} source={{ uri: p.imagen }} style={styles.carouselImage} />
          ))}
        </ScrollView>

        {/* Indicadores de puntos */}
        <View style={styles.dotsContainer}>
          {destacados.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Productos Destacados</Text>
      {destacados.map((p) => (
        <TouchableOpacity
          key={p.id}
          style={styles.card}
          onPress={() => navigation.navigate('Detalle', { producto: p })}
        >
          <Image source={{ uri: p.imagen }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{p.nombre}</Text>
            <Text style={styles.productPrice}>${p.precio}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  carouselImage: { width, height: 200, resizeMode: 'cover' },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
  activeDot: { backgroundColor: '#00796b' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', margin: 16 },
  card: { flexDirection: 'row', margin: 8, backgroundColor: '#f6f8fa', borderRadius: 12, padding: 12 },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productInfo: { marginLeft: 12, flex: 1 },
  productName: { fontSize: 16, fontWeight: '600' },
  productPrice: { fontSize: 14, color: '#00796b', marginTop: 4 },
});