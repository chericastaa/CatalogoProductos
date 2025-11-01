import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  onLogin: (user: { email: string; nombre: string }) => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('🔥 Botón tocado');
    if (!email.includes('@')) {
      Alert.alert('Email inválido');
      return;
    }
    if (password.length < 4) {
      Alert.alert('Contraseña muy corta');
      return;
    }
 
    console.log('✅ Enviando usuario...');
    onLogin({ email, nombre: email.split('@')[0] });
    console.log('✅ Usuario enviado, cerrando pantalla...');
    Alert.alert('¡Bienvenido!', `Hola, ${email.split('@')[0]}`, [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.boton} onPress={handleLogin}>
        <Text style={styles.textoBoton}>Ingresar</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  boton: {
    backgroundColor: '#00796b',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: { color: '#fff', fontSize: 16, fontWeight: '600' },
});