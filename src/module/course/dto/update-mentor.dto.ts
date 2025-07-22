import { IsString, IsNumber, IsObject } from 'class-validator';

export class UpdateMentorDto {
  @IsString()
  courseId: string;

  @IsNumber()
  mentorId: number;

  @IsObject()
  mentorData: any;
}
