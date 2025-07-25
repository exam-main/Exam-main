import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateLessonGroupDto } from './create-lesson-group.dto';

export class UpdateLessonGroupDto extends PartialType(CreateLessonGroupDto) {
  @ApiPropertyOptional({
    example: 'Frontend Basics Updated',
    description: 'Dars guruhining yangilangan nomi',
  })
  name?: string;

  @ApiPropertyOptional({
    example: 'f1234567-89ab-cdef-0123-456789abcdef',
    description: 'Yangilangan kurs IDsi (UUID formatda)',
  })
  courseId?: string;
}
