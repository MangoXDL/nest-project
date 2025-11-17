import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

class CreateOrderDto {
  @ApiProperty({ example: 'basketball' })
  @IsString()
  name: string;
}

export { CreateOrderDto };
