import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ example: 'car' })
  @IsString()
  @IsOptional()
  name?: string;
}
