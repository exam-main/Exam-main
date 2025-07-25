import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHomeworkDto {
  @ApiProperty({
    example: 'Yangi mavzu bo‘yicha referat tayyorlang',
    description: 'Talabaga topshiriq matni',
  })
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiPropertyOptional({
    example: 'uploads/homeworks/task1.pdf',
    description: 'Ixtiyoriy fayl yo‘li (PDF, DOCX va boshqalar)',
  })
  @IsOptional()
  @IsString()
  file?: string;

  @ApiProperty({
    example: 'clx9v3ghj0000ts1d0qxyc9xp',
    description: 'Ushbu homework tegishli bo‘lgan darsning ID raqami',
  })
  @IsNotEmpty()
  @IsString()
  lessonId: string;
}
