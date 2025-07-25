import { IsInt, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PassExamDto {
  @ApiProperty({
    example: 10,
    description: 'Topshirilayotgan imtihon ID raqami',
  })
  @IsInt()
  examId: number;

  @ApiProperty({
    example: 5,
    description: 'Foydalanuvchi ID raqami',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'Ushbu imtihon tegishli bo‘lgan lesson group ID',
  })
  @IsInt()
  lessonGroupId: number;

  @ApiProperty({
    example: { 1: 'A', 2: 'C', 3: 'B' },
    description:
      'Foydalanuvchi tanlagan javoblar obyekt ko‘rinishida. Kalit = questionId, qiymat = variant (A, B, C, D)',
    type: Object,
  })
  @IsObject()
  selectedAnswers: { [questionId: number]: string }; // { 5: 'A', 6: 'C' }
}
