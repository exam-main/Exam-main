import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonFileDto {
  @ApiProperty({
    example: 'https://example.com/file.pdf',
    description: 'Fayl manzili yoki nomi',
  })
  @IsString()
  file: string;

  @ApiPropertyOptional({
    example: 'Qoshimcha izoh yoki tavsif',
    description: 'Faylga oid qoshimcha malumot (majburiy emas)',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    example: 'f1234567-89ab-cdef-0123-456789abcdef',
    description: 'Biriktirilgan darsning IDsi (UUID formatda)',
  })
  @IsString()
  lessonId: string;
}
