import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({
    example: 'Kirish darsi',
    description: 'Dars nomi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Bu darsda asosiy tushunchalar tushuntiriladi.',
    description: 'Dars haqida qisqacha malumot',
  })
  @IsString()
  about: string;

  @ApiProperty({
    example: 'https://example.com/video.mp4',
    description: 'Dars videosi URL manzili',
  })
  @IsString()
  video: string;

  @ApiProperty({
    example: 5,
    description: 'Dars guruhining ID raqami',
  })
  @IsInt()
  groupId: number;
}
