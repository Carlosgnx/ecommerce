export interface Categoria {
  nombre: string;
  ruta: string | null;
  icono: string;
  subcategorias: Subcategoria[] | null;
}

interface Subcategoria {
  nombre: string;
  ruta: string;
}
