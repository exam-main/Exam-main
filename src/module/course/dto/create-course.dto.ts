import { IsString, IsNumber, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { CourseLevel } from '@prisma/client';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  about: string;

  @IsNumber()
  price: number;

  @IsString()
  banner: string;

  @IsOptional()
  @IsString()
  introVideo?: string;

  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  mentorId: number;
}
