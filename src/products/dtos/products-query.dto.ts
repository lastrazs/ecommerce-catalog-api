import { Type } from 'class-transformer';
import { IsInt, IsNumber, Min, IsOptional } from 'class-validator';

export class ProductsQueryDto {
    @Type(() => Number)
    @IsNumber({}, { message: 'minPrice must be a number' })
    @Min(0, { message: 'minPrice must be greater than or equal to 0' })
    @IsOptional()
    minPrice?: number;
    
    @Type(() => Number)
    @IsNumber({}, { message: 'maxPrice must be a number' })
    @Min(0, { message: 'maxPrice must be greater than or equal to 0' })
    @IsOptional()
    maxPrice?: number;

    @Type(() => Number)
    @IsInt({ message: 'limit must be an integer' })
    @Min(1, { message: 'limit must be greater than or equal to 1' })
    @IsOptional()
    limit?: number;

    @Type(() => Number)
    @IsInt({ message: 'offset must be an integer' })
    @Min(0, { message: 'offset must be greater than or equal to 0' })
    @IsOptional()
    offset?: number;

    @Type(() => Number)
    @IsInt({ message: 'categoryId must be an integer' })
    @Min(1, { message: 'categoryId must be greater than or equal to 1' })
    @IsOptional()
    categoryId?: number;
}