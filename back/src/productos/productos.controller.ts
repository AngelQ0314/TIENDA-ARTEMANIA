import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/usuarios/decorators/roles.decorator';
import { RolesGuard } from 'src/usuarios/guards/roles.guard';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  getAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productosService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateProductoDto) {
    return this.productosService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProductoDto) {
    return this.productosService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productosService.delete(id);
  }
}
