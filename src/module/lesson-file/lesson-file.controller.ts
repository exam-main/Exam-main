import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LessonFileService } from './lesson-file.service';
import { CreateLessonFileDto } from './dto/create-lesson-file.dto';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesGuard } from 'src/common/JWT/roles.guard';

@Controller('api/lesson-files')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LessonFileController {
  constructor(private readonly service: LessonFileService) {}

  @Get('lesson/:lesson_id')
  @Roles('ADMIN', 'MENTOR')
  getByLesson(@Param('lesson_id') lessonId: string) {
    return this.service.findByLessonId(lessonId);
  }

  @Post()
  @Roles('ADMIN', 'MENTOR')
  create(@Body() dto: CreateLessonFileDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'MENTOR')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
