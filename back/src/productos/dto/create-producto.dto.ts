export class CreateProductoDto {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria_id: number;
    imagen_url?: string;
    destacado?: boolean;
  }
  