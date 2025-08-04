import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class CreateOrderDto {
  @ApiProperty({ example: 'basketball' })
  @IsString()
  name: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  price: number;
}

export { CreateOrderDto };
