import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
