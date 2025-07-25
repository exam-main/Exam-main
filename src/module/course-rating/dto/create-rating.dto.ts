import { IsInt, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({ example: 5, minimum: 1, maximum: 5, description: 'Baholash darajasi (1 dan 5 gacha)' })
  @IsInt()
  @Min(1)
  @Max(5)
  rate: number;

  @ApiProperty({ example: 'Juda yaxshi kurs!', description: 'Foydalanuvchi fikri yoki izohi (majburiy emas bo‘lishi mumkin)' })
  @IsString()
  comment: string;

  @ApiProperty({ example: 'd2a79b9f-8e13-41b1-b347-e45f12d0384a', description: 'Baholanayotgan kursning ID raqami (UUID format)' })
  @IsString()
  courseId: string;
}
