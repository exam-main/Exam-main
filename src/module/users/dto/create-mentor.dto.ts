import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMentorDto {
  @ApiProperty({
    example: '+998901234567',
    description: 'Mentorning telefon raqami (unikal bolishi kerak)',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'Mentorning toliq ismi',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Mentorning akkaunt paroli',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 5,
    description: 'Mentorning tajribasi (yillarda)',
  })
  @IsNumber()
  experience: number;

  @ApiProperty({
    example: 'Senior Backend Developer',
    description: 'Mentorning kasbi',
  })
  @IsString()
  @IsNotEmpty()
  job: string;

  @ApiProperty({
    example: '10 yillik tajribaga ega backend mutaxassis...',
    description: 'Mentor haqida qisqacha bio',
  })
  @IsString()
  @IsNotEmpty()
  about: string;

  @ApiPropertyOptional({
    example: 'https://t.me/mentor_username',
    description: 'Telegram profili havolasi',
  })
  @IsOptional()
  @IsString()
  telegram?: string;

  @ApiPropertyOptional({
    example: 'https://facebook.com/mentor.name',
    description: 'Facebook profili havolasi',
  })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiPropertyOptional({
    example: 'https://instagram.com/mentor',
    description: 'Instagram profili havolasi',
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({
    example: 'https://linkedin.com/in/mentor',
    description: 'LinkedIn profili havolasi',
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional({
    example: 'https://github.com/mentor',
    description: 'GitHub profili havolasi',
  })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiPropertyOptional({
    example: 'https://mentor.com',
    description: 'Shaxsiy vebsayti havolasi',
  })
  @IsOptional()
  @IsString()
  website?: string;
}
