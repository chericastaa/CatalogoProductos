import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Producto } from '../types/Producto';

type CartItem = { producto: Producto; cantidad: number };

type Props = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export default function CartScreen({ cart, setCart }: Props) {
  const increaseQty = (id: string) => {
    setCart(prev =>
      prev.map(item =>
        item.producto.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.producto.id === id && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.producto.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Tu carrito está vacío</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.producto.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.nombre}>{item.producto.nombre}</Text>
                <Text style={styles.precio}>${item.producto.precio} c/u</Text>
                <View style={styles.controls}>
                  <TouchableOpacity onPress={() => decreaseQty(item.producto.id)}>
                    <Text style={styles.btn}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item.cantidad}</Text>
                  <TouchableOpacity onPress={() => increaseQty(item.producto.id)}>
                    <Text style={styles.btn}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeFromCart(item.producto.id)}>
                    <Text style={styles.remove}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Text style={styles.total}>Total: ${total}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 18 },
  item: { marginBottom: 16, padding: 12, backgroundColor: '#f6f8fa', borderRadius: 8 },
  nombre: { fontSize: 16, fontWeight: '600' },
  precio: { color: '#00796b', marginTop: 4 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  btn: { fontSize: 20, paddingHorizontal: 10 },
  qty: { marginHorizontal: 10, fontSize: 16 },
  remove: { marginLeft: 'auto' },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginTop: 16 },
});