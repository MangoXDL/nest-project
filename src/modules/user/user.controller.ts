import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  userCreate(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get('/users')
  async userGet() {
    const obj: object = {
      message: await this.userService.getUsers(),
    };
    return obj;
  }

  @Get('/user/:id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUser(Number(id));
  }

  @Delete('user/:id')
  userDelete(@Param('id') id: number) {
    return this.userService.deleteUser(Number(id));
  }
}
