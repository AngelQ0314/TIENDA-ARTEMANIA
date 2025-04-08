import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>
  ) {}

  findAll() {
    return this.productoRepo.find();
  }

  async findOne(id: number) {
    const producto = await this.productoRepo.findOne({ where: { id } });
    if (!producto) throw new NotFoundException(`Producto ${id} no encontrado`);
    return producto;
  }

  create(dto: CreateProductoDto) {
    const nuevo = this.productoRepo.create(dto);
    return this.productoRepo.save(nuevo);
  }

  async update(id: number, dto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    Object.assign(producto, dto);
    return this.productoRepo.save(producto);
  }

  async delete(id: number) {
    const resultado = await this.productoRepo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }
    return { message: `Producto ${id} eliminado exitosamente` };
  }
}
