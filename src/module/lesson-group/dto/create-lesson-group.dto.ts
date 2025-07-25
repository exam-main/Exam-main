import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonGroupDto {
  @ApiProperty({
    example: 'Frontend Basics',
    description: 'Dars guruhining nomi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'f1234567-89ab-cdef-0123-456789abcdef',
    description: 'Guruhga tegishli kursning IDsi (UUID formatda)',
  })
  @IsString()
  courseId: string;
}
