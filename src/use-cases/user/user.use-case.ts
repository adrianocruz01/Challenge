import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities';
import { IDataServices } from '../../core/abstract/IDataServices.abstract';
import { CreateUserDTO, UpdateUserDTO } from '../../core/dtos';
import { UserService } from './user.use-case.service';

@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: IDataServices,
    private userService: UserService,
  ) {}
  

  async createUser(data: CreateUserDTO): Promise<User> {
    const user = await this.userService.createNewUser(data);
    return this.dataServices.users.create(user);
  }

  
  async UpdateUserAvatar(id: string, data: string): Promise<User> {
    const user = await this.userService.updateAvatar(data);
    return await this.dataServices.users.updateById(id, user);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDTO,
  ): Promise<User> {
    const user = await this.userService.updateUser(updateUserDto);
    return this.dataServices.users.updateById(id, user);
  }

  async getAll(): Promise<User[]> {
    return this.dataServices.users.getAll();
  }

  async getUserById(id: string): Promise<User> {
    return this.dataServices.users.getById(id);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.dataServices.users.getByEmail(email);
  }
}