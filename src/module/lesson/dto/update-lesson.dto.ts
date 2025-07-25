import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateLessonDto } from './create-lesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @ApiPropertyOptional({
    example: 'Yangi dars nomi',
    description: 'Dars nomi (majburiy emas)',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'Yangi dars haqida malumot',
    description: 'Dars haqida qisqacha malumot (majburiy emas)',
  })
  about?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/new-video.mp4',
    description: 'Dars videosi URL manzili (majburiy emas)',
  })
  video?: string;

  @ApiPropertyOptional({
    example: 10,
    description: 'Dars guruhining ID raqami (majburiy emas)',
  })
  groupId?: number;
}
