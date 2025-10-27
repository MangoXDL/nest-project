import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as ms from 'ms';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(User) private userRepositrory: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const password = await bcrypt.hash(dto.password, 10);

    const user = this.userRepositrory.create({ ...dto, password });

    return await this.userRepositrory.save(user);
  }

  getUsers() {
    return this.userRepositrory.find();
  }

  async getUser(id: number) {
    const user = await this.userRepositrory.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async deleteUser(id: number) {
    await this.userRepositrory.delete({ id });
    return { message: 'deleted' };
  }

  async loginUser(dto: LoginUserDto, res: Response) {
    const user = await this.userRepositrory.findOne({
      where: { name: dto.name },
    });

    if (!user) {
      throw new NotFoundException(`User with name ${dto.name} not found`);
    }

    if (await bcrypt.compare(dto.password, user.password)) {
      const encrypt: AccesToken = { userId: user.id };

      const token = this.jwtService.sign(encrypt, {
        expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
      });

      res.cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        partitioned: true,
        maxAge: ms(
          this.configService.get<string>(
            'ACCESS_TOKEN_EXPIRATION',
          ) as ms.StringValue,
        ),
      });
    } else {
      throw new BadRequestException('password is incorrect');
    }
  }
}
