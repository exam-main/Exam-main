import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'Foydalanuvchi ismi' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'ali@example.com', description: 'Foydalanuvchi email manzili' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Iltimos, menga qoshimcha malumot yuboring.', description: 'Xabar matni' })
  @IsNotEmpty()
  @IsString()
  message: string;
}
