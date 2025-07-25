import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitHomeworkDto {
  @ApiPropertyOptional({
    example: 'Men topshiriq bo‘yicha tayyorlagan javobim shu yerda',
    description: 'Ixtiyoriy matn shaklidagi javob',
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({
    example: 'uploads/homeworks/submission1.pdf',
    description: 'Ixtiyoriy fayl yo‘li (PDF, DOCX va boshqalar)',
  })
  @IsOptional()
  @IsString()
  file?: string;
}
