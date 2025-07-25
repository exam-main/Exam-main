import {
  Controller, Get, Post, Body, Param, Delete, Put, Patch, UseGuards, Request
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesGuard } from 'src/common/JWT/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/lessons')
@UseGuards(JwtAuthGuard)
export class LessonController {
  constructor(private readonly service: LessonService) {}

  @ApiBearerAuth()
  @Get('single/:lessonId')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  getOneStudent(@Param('lessonId') lessonId: string) {
    return this.service.findOneForStudent(lessonId);
  }

  @ApiBearerAuth()
  @Put('view/:lessonId')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  view(@Param('lessonId') lessonId: string, @Request() req) {
    return this.service.incrementViewCount(lessonId, req.user.id);
  }

  @ApiBearerAuth()
  @Get('detail/:id')
  @Roles('ADMIN', 'MENTOR')
  @UseGuards(RolesGuard)
  getDetail(@Param('id') id: string) {
    return this.service.findDetail(id);
  }

  @ApiBearerAuth()
  @Post('create')
  @Roles('ADMIN', 'MENTOR')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateLessonDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @Roles('ADMIN', 'MENTOR')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles('ADMIN', 'MENTOR')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
