import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    example: '+998901112233',
    description: 'Adminning telefon raqami (unikal bolishi kerak)',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'Odilbek Qodirov',
    description: 'Adminning toliq ismi',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'adminPassword456',
    description: 'Admin uchun parol',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'Admin foydalanuvchi nomi (username)',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Admin email manzili',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
