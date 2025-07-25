import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CourseLevel } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    example: 'NestJS Asoslari',
    description: 'Kurs nomi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'NestJS frameworkini toliq organamiz',
    description: 'Kurs haqida qisqacha malumot',
  })
  @IsString()
  about: string;

  @ApiProperty({
    example: 150000,
    description: 'Kurs narxi (som)',
  })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'https://cdn.example.com/images/nestjs-banner.jpg',
    description: 'Kurs bannerining URL manzili',
  })
  @IsString()
  banner: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/videos/intro.mp4',
    description: 'Tanishtiruv videosi (ixtiyoriy)',
  })
  @IsOptional()
  @IsString()
  introVideo?: string;

  @ApiProperty({
    example: 'BEGINNER',
    enum: CourseLevel,
    description: 'Kurs darajasi (BEGINNER, INTERMEDIATE, ADVANCED)',
  })
  @IsEnum(CourseLevel)
  level: CourseLevel;

  @ApiProperty({
    example: 1,
    description: 'Category ID (CourseCategory jadvalidan mavjud ID bolishi kerak)',
  })
  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: 2,
    description: 'Mentor ID (User jadvalidan mavjud MENTOR roldagi foydalanuvchi ID)',
  })
  @Type(() => Number)
  @IsNumber()
  mentorId: number;
}
