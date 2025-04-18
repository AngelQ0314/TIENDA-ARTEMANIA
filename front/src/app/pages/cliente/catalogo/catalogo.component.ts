import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../../../services/producto.service';
import { SubcategoriaService } from '../../../services/subcategorias.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  subcategorias: any[] = [];
  productos: Producto[] = [];
  subcategoriaSeleccionada: number | null = null;
  cantidades: { [id: number]: number } = {};

  constructor(
    private productoService: ProductoService,
    private subcategoriaService: SubcategoriaService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.subcategoriaService.listar().subscribe((res) => {
      this.subcategorias = res;
      if (res.length > 0) {
        this.seleccionarSubcategoria(res[0].id);
      }
    });

    this.generarSessionIdSiNoExiste();
  }

  generarSessionIdSiNoExiste() {
    const id = localStorage.getItem('session_id');
    if (!id) {
      const nuevoId = crypto.randomUUID();
      localStorage.setItem('session_id', nuevoId);
    }
  }

  seleccionarSubcategoria(id: number) {
    this.subcategoriaSeleccionada = id;
    this.productoService.obtenerPorSubcategoria(id).subscribe((res) => {
      this.productos = res;
    });
  }

  agregarAlCarrito(producto: Producto) {
    const cantidad = this.cantidades[producto.id] || 1;
  
    if (cantidad > producto.stock) {
      alert('La cantidad supera el stock disponible.');
      return;
    }
  
    const session_id = localStorage.getItem('session_id')!;
  
    this.carritoService.agregarProducto(producto.id, cantidad, session_id).subscribe({
      next: () => {
        alert('Producto agregado al carrito');
        this.cantidades[producto.id] = 1;
  
        // ✅ Fuerza actualización del contador
        this.carritoService.refrescarCantidad();
      },
      error: () => {
        alert('Ocurrió un error al agregar al carrito');
      }
    });
  }
  
}
