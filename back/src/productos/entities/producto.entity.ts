import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio: number;

  @Column()
  stock: number;

  @Column()
  categoria_id: number;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagen_url: string;

  @Column({ default: false })
  destacado: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;
}
