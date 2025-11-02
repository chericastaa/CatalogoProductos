import { Producto } from "./Producto";

export type StackParamList = {
  Inicio: undefined;
  Detalle: {
    producto: {
      id: string;
      nombre: string;
      precio: number;
      descripcion: string;
      imagen: string;
    };
  };
  Login: undefined;
  FinalizarCompra: {
    cart: { producto: Producto; cantidad: number }[];
    user: { email: string; nombre: string } | null;
    onFinalizar: () => void;
  };
};