import { ApiProperty } from '@nestjs/swagger';

class CreateOrderDto {
  @ApiProperty({ example: 'basketball' })
  name: string;

  @ApiProperty({ example: 10 })
  price: number;
}

export { CreateOrderDto };
