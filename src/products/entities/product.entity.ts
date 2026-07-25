import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../categories/entities/category.entity";
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn() id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    name: string

    @Column({ type: 'text', nullable: true })
    description?: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number

    @Column({ type: 'integer', default: 0 })
    stock: number
    
    @ManyToOne(() => Category, (category) => category.products, { nullable: false })
    category: Category;
}