import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ example: 'What is the capital of France?', description: 'Question text' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: 'image-url-or-filename.jpg', description: 'Optional file attached to the question' })
  @IsOptional()
  @IsString()
  file?: string;
}

export class UpdateQuestionDto {
  @ApiPropertyOptional({ example: 'What is the capital of France?', description: 'Question text' })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ example: 'image-url-or-filename.jpg', description: 'Optional file attached to the question' })
  @IsOptional()
  @IsString()
  file?: string;
}

export class AnswerDto {
  @ApiProperty({ example: 'Paris', description: 'Answer text' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: 'answer-image.jpg', description: 'Optional file attached to the answer' })
  @IsOptional()
  @IsString()
  file?: string;
}

export class CheckAnswerDto {
  @ApiProperty({ example: true, description: 'Whether the answer is correct' })
  @IsBoolean()
  correct: boolean;

  @ApiPropertyOptional({ example: 'Good job!', description: 'Optional comment about the answer' })
  @IsOptional()
  @IsString()
  comment?: string;
}
