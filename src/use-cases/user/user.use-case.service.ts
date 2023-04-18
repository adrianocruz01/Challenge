import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../../core/entities';
import { CreateUserDTO, UpdateUserDTO } from '../../core/dtos';
import { IDataServices } from '../../core/abstract/IDataServices.abstract';

@Injectable()
export class UserService {
  
  constructor(private dataServices: IDataServices) {}

  async createNewUser(data: CreateUserDTO) {
    await this.verify(data.email);

    const user = new User();


    user.name = data.name;
    user.email = data.email;
    user.avatar_url = '_'
    return user;
  }

   async updateAvatar(data: string) {
    const user = new User();

    user.avatar_url = data;

    return user;
  }

  async updateUser(data: UpdateUserDTO) {
    const user = new User();


    user.name = data.name;
    user.email = data.email;


    return user;
  }

  async verify(email: string) {
    const verify = await this.dataServices.users.getByEmail(email);

    if (verify) {
      throw new BadRequestException(
        `A user is already registered with the email: ${email}`,
      );
    }

    return verify;
  }
}
