import { Controller, Get, Param, Post, Body, Put, UseInterceptors, UploadedFile, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from '../core/dtos';
import { UserUseCases } from '../use-cases/user/user.use-case';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import RabbitmqServer from 'src/rebbitmq-server';
import * as crypto from 'crypto';
import * as fs from 'fs';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get()
  @ApiOperation({
    summary: 'Return user data',
  })
  async getAll() {
    return this.userUseCases.getAll();
  }

  @Get('avatar/:id')
  @ApiOperation({
    summary: 'Retorna um usuário pelo id',
  })
  async getAvatarById(@Param('id') id: string) {

    const user = await this.userUseCases.getUserById(id);

    return user.avatar_url;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Returns a user by id',
  })
  async getById(@Param('id') id: string) {
    return this.userUseCases.getUserById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Register user',
  })
  async createUser(@Body() userDto: CreateUserDTO) {
    const server = new RabbitmqServer('amqp://admin:admin@localhost:5672');

    await server.start();

    await server.publishInQueue('server', JSON.stringify(userDto));

    return this.userUseCases.createUser(userDto);
  }

  @Put(':id')
    updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return this.userUseCases.updateUser(id, updateUserDto);
  }

  @Put('file/:id')
    @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: async (req, file, callback) => {
          const fileHash = crypto.randomBytes(10).toString('base64');
          const fileName = `${fileHash}-${file.originalname}` ;

          callback(null, fileName);
        },
      }),
    }),
  )
  async handleUpload(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {await this.deleteFile(id);

    const update = await this.userUseCases.UpdateUserAvatar(
      id,
      file.filename,
    );

    console.log('file: ', file.filename);

    return update;
    }

    @Delete('file/:id')
    @ApiOperation({
      summary: 'Return one user by id',
    })
    async deleteFile(@Param('id') id: string) {
        const user = await this.userUseCases.getUserById(id);

        const fileName = user.avatar_url; // Usa o nome do arquivo antigo salvo
    
        if (fs.existsSync( `./uploads/${fileName}`)) {
          await fs.promises.unlink(`./uploads/${fileName}`);
          return { message: 'File deleted successfully' };
        } else {
          console.log('The file does not exist');
          return { message: 'File not found' };
        }
    }
}