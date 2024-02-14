import { IsMongoId, IsNumber, Max, Min } from 'class-validator';

export class AddToCartDto {
  @IsMongoId()
  productId: string;
  @IsNumber()
  @Min(1)
  @Max(10)
  quantity: number;
}
