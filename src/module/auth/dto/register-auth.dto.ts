import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({ example: 'johndoe', description: 'Username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email manzil' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqam' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'StrongPassword123', description: 'Parol' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'To‘liq ism' })
  @IsString()
  fullName: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'Uzbekistan', description: 'Mamlakat' })
  @IsOptional()
  @IsString()
  country?: string;
}
