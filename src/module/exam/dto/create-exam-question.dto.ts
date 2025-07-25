import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamQuestionDto {
  @ApiProperty({ example: 'Qaysi til JavaScript kompilyatorida ishlaydi?', description: 'Savol matni' })
  @IsString()
  question: string;

  @ApiProperty({ example: 'Python', description: 'A varianti' })
  @IsString()
  variantA: string;

  @ApiProperty({ example: 'C++', description: 'B varianti' })
  @IsString()
  variantB: string;

  @ApiProperty({ example: 'TypeScript', description: 'C varianti' })
  @IsString()
  variantC: string;

  @ApiProperty({ example: 'Ruby', description: 'D varianti' })
  @IsString()
  variantD: string;

  @ApiProperty({ example: 'C', description: 'To‘g‘ri javob varianti (masalan: A, B, C yoki D)' })
  @IsString()
  correctAnswer: string;

  @ApiProperty({ example: 12, description: 'Savol tegishli bo‘lgan exam ID raqami' })
  @IsInt()
  examId: number;
}
