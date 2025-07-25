import { IsEnum, IsInt, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExamAnswerEnum } from 'src/common/enums/exam-answer.enum'; // to‘g‘ri yo‘lni kiriting

export class CreateExamDto {
  @ApiProperty({ example: 'HTML nima uchun ishlatiladi?' })
  @IsString()
  @MinLength(3)
  question: string;

  @ApiProperty({ example: 'A varianti' })
  @IsString()
  variantA: string;

  @ApiProperty({ example: 'B varianti' })
  @IsString()
  variantB: string;

  @ApiProperty({ example: 'C varianti' })
  @IsString()
  variantC: string;

  @ApiProperty({ example: 'D varianti' })
  @IsString()
  variantD: string;

  @ApiProperty({
    example: ExamAnswerEnum.B,
    enum: ExamAnswerEnum,
    description: 'To‘g‘ri javob varianti (A, B, C, D)',
  })
  @IsEnum(ExamAnswerEnum)
  answer: ExamAnswerEnum;

  @ApiProperty({ example: 3, description: 'LessonGroup ID' })
  @IsInt()
  lessonGroupId: number;

  @ApiProperty({ example: 'Frontend Test', description: 'Sarlavha' })
  @IsString()
  title: string;
}
