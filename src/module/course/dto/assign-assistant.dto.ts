import { IsString, IsNumber } from 'class-validator';

export class AssignAssistantDto {
  @IsString()
  courseId: string;

  @IsNumber()
  assistantId: number;
}
