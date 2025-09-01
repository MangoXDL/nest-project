import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'product' })
  @IsString()
  name: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  price: number;
}
