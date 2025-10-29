import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Linking } from 'react-native';

export default function InfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Catálogo de Productos</Text>
      <Text style={styles.texto}>Trabajo Práctico Integrador</Text>
      <Text style={styles.texto}>IFTS - Desarrollo de Aplicaciones para Dispositivos Móviles</Text>
      <Text style={styles.texto}>Autor: Castañeda Cheri</Text>
      <Text style={styles.texto}>📱 React Native + TypeScript + Expo</Text>
    </View>
  );

  const openMaps = () => {
  const url = 'https://maps.google.com/?q=-34.6037,-58.3816'; // Cambiá por tu dirección
  Linking.openURL(url);
};
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f6f8fa', alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  texto: { fontSize: 16, color: '#555', marginVertical: 4, textAlign: 'center' },
});