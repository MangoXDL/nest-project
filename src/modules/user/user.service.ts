import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(User) private userRepositrory: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.userRepositrory.create(dto);
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
}
