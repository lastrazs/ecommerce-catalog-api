import{ IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto{
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @Length(3,100, { message: 'Name must be between 3 and 100 characters' })
    name: string;

    @IsString({ message: 'Description must be a string'})
    @IsOptional()
    description?: string;
}