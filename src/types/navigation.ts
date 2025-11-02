import { Producto } from "./Producto";

export type RootStackParamList = {
  Inicio: undefined;
  Catalogo: undefined;
  Detalle: {
    producto: {
      id: string;
      nombre: string;
      precio: number;
      descripcion: string;
      imagen: string;
    };
  };
  AltaProducto: undefined;
  Login: undefined;
  FinalizarCompra: {
    cart: { producto: Producto; cantidad: number }[];
    user: { email: string; nombre: string } | null;
    onFinalizar: () => void;
  };
};