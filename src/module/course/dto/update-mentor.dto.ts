import { IsString, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMentorDto {
  @ApiProperty({ example: 'c1a2b3c4-d5e6-7890-1234-abcdef123456' })
  @IsString()
  courseId: string;

  @ApiProperty({ example: 7 })
  @IsNumber()
  mentorId: number;

  @ApiProperty({ example: { bio: 'Updated mentor bio', experience: '5 years' } })
  @IsObject()
  mentorData: Record<string, any>;
}
