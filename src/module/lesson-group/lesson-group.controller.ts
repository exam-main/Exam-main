import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LessonGroupService } from './lesson-group.service';
import { CreateLessonGroupDto } from './dto/create-lesson-group.dto';
import { UpdateLessonGroupDto } from './dto/update-lesson-group.dto';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesGuard } from 'src/common/JWT/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/lesson-group')
@UseGuards(JwtAuthGuard)
export class LessonGroupController {
  constructor(private readonly service: LessonGroupService) {}

  @Get('all/:course_id')
  getAll(@Param('course_id') courseId: string) {
    return this.service.findAllByCourse(courseId);
  }
  @ApiBearerAuth()
  @Get('mine-all/:course_id')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  getMine(@Param('course_id') courseId: string) {
    return this.service.findMineAll(courseId);
  }
  @ApiBearerAuth()
  @Get('detail/:id')
  getDetail(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }
  @ApiBearerAuth()
  @Post()
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateLessonGroupDto) {
    return this.service.create(dto);
  }
  @ApiBearerAuth()
  @Put(':id')
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() dto: UpdateLessonGroupDto) {
    return this.service.update(Number(id), dto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
