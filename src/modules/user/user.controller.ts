import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { Response, Request } from 'express';
import { Public } from 'src/common/auth/public.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  @Public()
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

  @Get('/user')
  getUserById(@Req() req: CustomRequest) {
    const userId = req.user.userId;
    return this.userService.getUser(userId);
  }

  @Delete('user/:id')
  userDelete(@Param('id') id: number) {
    return this.userService.deleteUser(Number(id));
  }

  @Post('/user/login')
  @Public()
  async userLogin(@Body() dto: LoginUserDto, @Res() res: Response) {
    await this.userService.loginUser(dto, res);
    return res.send({ message: 'user logged in' });
  }
}
