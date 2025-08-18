import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

class CreateOrderDto {
  @ApiProperty({ example: 'basketball' })
  @IsString()
  name: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  userId?: number;
}

export { CreateOrderDto };
