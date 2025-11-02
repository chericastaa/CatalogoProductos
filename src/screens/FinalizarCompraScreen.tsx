import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Producto } from '../types/Producto';

type Props = {
  cart: { producto: Producto; cantidad: number }[];
  user: { email: string; nombre: string } | null;
  onFinalizar: () => void;
};

type PaymentMethod = 'debit' | 'credit' | 'prepaid' | 'cash' | null;

export default function FinalizarCompraScreen({ cart, user, onFinalizar }: Props) {
  const navigation = useNavigation();
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Debes iniciar sesión</Text>
        <Text style={{ marginVertical: 12 }}>Iniciá sesión para poder finalizar la compra.</Text>
        <TouchableOpacity style={styles.botonFinalizar} onPress={() => (navigation as any).navigate('Login')}>
          <Text style={styles.textoBoton}>Ir a Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const total = cart.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

  const resetForm = () => {
    setMethod(null);
    setCardNumber('');
    setCardName('');
    setExpiry('');
    setCvv('');
  };

  const handlePayment = () => {
    if (!method) {
      Alert.alert('Seleccioná un método de pago');
      return;
    }

    if (method === 'cash') {
      // Simple confirmation for cash
      Alert.alert(
        'Confirmar pago en efectivo',
        `Vas a pagar en efectivo el total de $${total}. ¿Confirmás?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: () => finalizePurchase() },
        ]
      );
      return;
    }

    // For card payments, basic validation
    if (!cardNumber || !cardName || !expiry || !cvv) {
      Alert.alert('Completá los datos de la tarjeta');
      return;
    }

    // In a real app you'd call a payment SDK here. We'll just simulate success.
    Alert.alert(
      'Procesando pago',
      `Método: ${method === 'debit' ? 'Tarjeta de débito' : method === 'credit' ? 'Tarjeta de crédito' : 'Tarjeta prepaga'}`,
      [
        { text: 'OK', onPress: () => finalizePurchase() }
      ]
    );
  };

  const finalizePurchase = () => {
    Alert.alert(
      '¡Compra exitosa!',
      `Gracias por tu compra, ${user?.nombre || ''}.\nTotal: $${total}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Vaciar carrito y resetear formulario, luego navegar al inicio
            onFinalizar();
            resetForm();
            (navigation as any).navigate('InicioTab', { screen: 'Inicio' });
          },
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Resumen y pago</Text>

      <Text style={styles.saludo}>Hola, {user.nombre} 👋</Text>
      <Text style={styles.email}>Email: {user.email}</Text>

      <Text style={styles.subtitulo}>Resumen de tu compra:</Text>

      {cart.map(item => (
        <View key={item.producto.id} style={styles.item}>
          <Text style={styles.nombre}>{item.producto.nombre}</Text>
          <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
          <Text style={styles.precio}>${item.producto.precio} c/u</Text>
        </View>
      ))}

      <Text style={styles.total}>Total: ${total}</Text>

      <Text style={[styles.subtitulo, { marginTop: 20 }]}>Elegí un método de pago</Text>

      <View style={styles.methodsContainer}>
        <TouchableOpacity style={[styles.methodButton, method === 'debit' && styles.methodActive]} onPress={() => setMethod('debit')}>
          <Text style={styles.methodText}>Tarjeta de débito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.methodButton, method === 'credit' && styles.methodActive]} onPress={() => setMethod('credit')}>
          <Text style={styles.methodText}>Tarjeta de crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.methodButton, method === 'prepaid' && styles.methodActive]} onPress={() => setMethod('prepaid')}>
          <Text style={styles.methodText}>Tarjeta prepaga</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.methodButton, method === 'cash' && styles.methodActive]} onPress={() => setMethod('cash')}>
          <Text style={styles.methodText}>Efectivo</Text>
        </TouchableOpacity>
      </View>

      {method && method !== 'cash' && (
        <View style={styles.cardForm}>
          <TextInput placeholder="Número de tarjeta" value={cardNumber} onChangeText={setCardNumber} style={styles.input} keyboardType="numeric" />
          <TextInput placeholder="Nombre en la tarjeta" value={cardName} onChangeText={setCardName} style={styles.input} />
          <TextInput placeholder="MM/AA" value={expiry} onChangeText={setExpiry} style={styles.input} />
          <TextInput placeholder="CVV" value={cvv} onChangeText={setCvv} style={styles.input} keyboardType="numeric" />
        </View>
      )}

      <TouchableOpacity style={styles.botonFinalizar} onPress={handlePayment}>
        <Text style={styles.textoBoton}>Pagar ${total}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  saludo: { fontSize: 18, marginBottom: 4 },
  email: { fontSize: 14, color: '#555', marginBottom: 12 },
  subtitulo: { fontSize: 18, marginTop: 12, marginBottom: 8 },
  item: { marginBottom: 12, padding: 12, backgroundColor: '#f6f8fa', borderRadius: 8 },
  nombre: { fontSize: 16, fontWeight: '600' },
  cantidad: { fontSize: 14, color: '#555' },
  precio: { fontSize: 14, color: '#00796b' },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginTop: 8 },
  methodsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  methodButton: { padding: 12, borderRadius: 8, backgroundColor: '#eee', marginRight: 8, marginBottom: 8 },
  methodActive: { backgroundColor: '#00796b' },
  methodText: { color: '#000' },
  cardForm: { marginTop: 12 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 8 },
  botonFinalizar: { backgroundColor: '#00796b', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  textoBoton: { color: '#fff', fontSize: 18, fontWeight: '600' },
});