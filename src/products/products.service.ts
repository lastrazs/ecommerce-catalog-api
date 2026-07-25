import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Category } from "../categories/entities/category.entity";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { ProductsQueryDto } from "./dtos/products-query.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>
    ) {}
    async findAll(query: ProductsQueryDto): Promise<Product[]> {
        const {
            categoryId,
            minPrice,
            maxPrice,
            limit = 10,
            offset = 0,
        } = query;

        const queryBuilder = this.productRepo
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category');

        if (categoryId !== undefined) {
            queryBuilder.andWhere('category.id = :categoryId', { categoryId });
        }

        if (minPrice !== undefined) {
            queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
        }

        if (maxPrice !== undefined) {
            queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
        }

        queryBuilder.take(Math.max(limit, 1));
        queryBuilder.skip(offset);

        return await queryBuilder.getMany();
    }
    async findOne(id: number): Promise<Product> {
        const product = await this.productRepo.findOne({
            where: { id },
            relations: { category: true },
        });
        if (!product) {
            throw new NotFoundException(`Product not found ${id}`);
        }
        return product;
    }
    async create(createProductDto: CreateProductDto){
        const { name, description, price, stock, categoryId } = createProductDto;

        const category = await this.categoryRepo.findOne({ 
            where: { id: categoryId }
        });

        if (!category) {
            throw new NotFoundException(`Category not found ${categoryId}`);
        }

        const product = this.productRepo.create({
            name,
            description,
            price,
            stock,
            category,
        });

        try {
            return await this.productRepo.save(product);
        } catch (error: any) {
            if (error?.code === '23505') {
                throw new ConflictException('Product name already exists');
            }
            throw error;
        }
    }

    async update(id: number, updateProductDto: UpdateProductDto){
        const { categoryId, name, description, price, stock } = updateProductDto;

        const product = await this.findOne(id);

        if (categoryId !== undefined) {
            const category = await this.categoryRepo.findOne({
                where: { id: categoryId }
            });

            if (!category) {
                throw new NotFoundException(`Category not found ${categoryId}`);
            }
            product.category = category;
        }
        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;

        try {
            return await this.productRepo.save(product);
        } catch (error: any) {
            if (error?.code === '23505') {
                throw new ConflictException('Product name already exists');
            }
            throw error;
        }
    }

    async remove(id: number): Promise<{ message: string }> {
        const product = await this.findOne(id);
        return await this.productRepo.remove(product).then(() => {
            return { message: `Product removed successfully ${id}` };
        });
        
    }
}