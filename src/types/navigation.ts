export type RootStackParamList = {
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
};