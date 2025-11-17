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
import { CustomRequest } from 'src/common/auth/custom.request';

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

  @Delete('user')
  userDelete(@Req() req: CustomRequest) {
    const userId = req.user.userId;
    return this.userService.deleteUser(userId);
  }

  @Post('/user/login')
  @Public()
  async userLogin(@Body() dto: LoginUserDto, @Res() res: Response) {
    await this.userService.loginUser(dto, res);
    return res.send({ message: 'user logged in' });
  }

  @Post('/user/logout')
  logoutUser(@Res() res: Response) {
    res.clearCookie('access_token', { partitioned: true, secure: true });
    return res.send({ message: 'user logged out' });
  }
}
