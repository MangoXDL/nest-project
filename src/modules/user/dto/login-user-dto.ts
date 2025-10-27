import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}
