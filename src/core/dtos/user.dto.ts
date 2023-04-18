import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'Romário',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'e-mail do Usuário',
    example: 'user@email.com',
  })
  email: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'Romário',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'e-mail do Usuário',
    example: 'user@email.com',
  })
  email: string;
}