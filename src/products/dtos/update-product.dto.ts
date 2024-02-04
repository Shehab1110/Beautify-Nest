import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProdcutDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  price: number;

  @IsOptional()
  @IsString()
  @IsEnum([
    'face',
    'eyes',
    'lips',
    'nails',
    'brushes and tools',
    'makeup removals',
    'skin care',
    'hair care',
    'bath and body',
  ])
  category: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  inStock: number;

  @IsOptional()
  seller: {
    name: string;
  };
}
