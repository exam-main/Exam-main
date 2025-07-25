import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @IsString()
  username: string;

  @ApiProperty({ example: 'admin123', description: 'Foydalanuvchi paroli' })
  @IsString()
  password: string;

  @ApiProperty({ example: '+998901112233', description: 'Foydalanuvchi telefon raqami' })
  @IsString()
  phone: string;
}
