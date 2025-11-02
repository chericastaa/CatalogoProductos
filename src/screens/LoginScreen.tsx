import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  onLogin: (user: { email: string; nombre: string }) => void;
};

export default function LoginScreen({ onLogin }: Props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ingresado, setIngresado] = useState(false);

  const handleLogin = () => {
    if (!email.includes('@')) {
      alert('Email inválido');
      return;
    }
    if (password.length < 6) {
      alert('Contraseña muy corta (mínimo 6 caracteres)');
      return;
    }

    onLogin({ email, nombre: email.split('@')[0] });
    setIngresado(true); // ← pantalla de bienvenida
  };

  return (
    <View style={styles.container}>
      {!ingresado && (
        <>
          <Text style={styles.titulo}>Iniciar sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.filaContrasena}>
            <TextInput
              style={styles.inputContrasena}
              placeholder="Contraseña (mínimo 6 caracteres)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.btnVer}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.textoVer}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.boton} onPress={handleLogin}>
            <Text style={styles.textoBoton}>Ingresar</Text>
          </TouchableOpacity>

          <Text style={styles.leyenda}>Cualquier email y contraseña válidos funcionan</Text>
        </>
      )}

      {ingresado && (
        <View style={styles.bienvenida}>
          <Text style={styles.saludo}>Hola, {email.split('@')[0]} 👋</Text>
          <Text style={styles.subtitulo}>Ya puedes seguir comprando</Text>
          <TouchableOpacity
            style={styles.cerrarSesion}
            onPress={() => {
              onLogin(null);
              setIngresado(false);
              alert('Sesión cerrada');
            }}
          >
            <Text style={styles.textoCerrar}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      )}
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
  filaContrasena: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputContrasena: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  btnVer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  textoVer: { fontSize: 16 },
  boton: {
    backgroundColor: '#00796b',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: { color: '#fff', fontSize: 16, fontWeight: '600' },
  bienvenida: { alignItems: 'center', marginTop: 40 },
  saludo: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitulo: { fontSize: 16, color: '#555', marginBottom: 24 },
  cerrarSesion: {
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 8,
  },
  textoCerrar: { color: '#fff', fontSize: 14, fontWeight: '600' },
  leyenda: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 16 },
});