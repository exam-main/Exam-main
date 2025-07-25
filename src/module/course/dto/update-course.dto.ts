import { PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(CreateCourseDto)
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
