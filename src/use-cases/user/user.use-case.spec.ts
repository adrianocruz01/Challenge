import { BadRequestException } from '@nestjs/common';
import { User } from '../../core/entities';
import { CreateUserDTO, UpdateUserDTO } from '../../core/dtos';
import { IDataServices } from '../../core/abstract/IDataServices.abstract';
import { UserService } from './user.use-case.service';
import { IGenericAbstract } from '../../core/abstract/IGenericRepository.abstract';

describe('UserService', () => {
  let userService: UserService;
  let dataServices: IDataServices;

  beforeEach(() => {
    dataServices = {
      users: {
        getByEmail: jest.fn(),
      } as unknown as IGenericAbstract<User>,
    };
    userService = new UserService(dataServices);
  });

  describe('createNewUser', () => {
    it('should create a new user when email is not in use', async () => {
      // Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
      (dataServices.users.getByEmail as jest.Mock).mockResolvedValue(
        undefined,
      );

      // Act
      const userr = await userService.createNewUser(createUserDTO);

      // Assert
      expect(userr.name).toEqual(createUserDTO.name);
      expect(userr.email).toEqual(createUserDTO.email);
      expect(userr.avatar_url).toEqual('');
    });

    it('should throw BadRequestException when email is already in use', async () => {
      // Arrange
      const createUserDTO: CreateUserDTO = {
        name: 'John Doe',
        email: 'john.doe@example.com',
      };

      const existingUser: User = {
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        avatar_url: '',
      };

      (dataServices.users.getByEmail as jest.Mock).mockResolvedValue(
        existingUser,
      );

      // Act & Assert
      await expect(
        userService.createNewUser(createUserDTO),
      ).rejects.toThrow(BadRequestException);
    });

    describe('updateAvatar', () => {
      it('should update the avatar URL of an userr', async () => {
        // Arrange
        const newAvatarUrl = 'https://example.com/avatar.png';

        // Act
        const user = await userService.updateAvatar(newAvatarUrl);

        // Assert
        expect(user.avatar_url).toEqual(newAvatarUrl);
      });
    });

    describe('updateUser', () => {
      it('should update the name and email of an user', async () => {
        // Arrange
        const updateUsersDTO: UpdateUserDTO = {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
        };

        // Act
        const user = await userService.updateUser(updateUsersDTO);

        // Assert
        expect(user.name).toEqual(updateUsersDTO.name);
        expect(user.email).toEqual(updateUsersDTO.email);
      });
    });
  });
});