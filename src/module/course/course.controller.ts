// course.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('api/courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get('single/:id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Get('single-full/:id')
  findOneFull(@Param('id') id: string) {
    return this.courseService.findOneFull(id);
  }

  @Get('all')
  findAllAdmin() {
    return this.courseService.findAllAdmin();
  }

  @Get('my')
  findMyCourses(@Query('mentorId') mentorId: number) {
    return this.courseService.findMyCourses(mentorId);
  }

  @Get('mentor/:id')
  findByMentor(@Param('id') id: number) {
    return this.courseService.findByMentor(id);
  }

  @Get('my/assigned')
  findMyAssigned(@Query('assistantId') assistantId: number) {
    return this.courseService.findMyAssigned(assistantId);
  }

  @Get(':courseId/assistants')
  findAssistants(@Param('courseId') courseId: string) {
    return this.courseService.findAssistants(courseId);
  }

  @Post('assign-assistant')
  assignAssistant(@Body() data: { courseId: string; assistantId: number }) {
    return this.courseService.assignAssistant(data.courseId, data.assistantId);
  }

  @Post('unassign-assistant')
  unassignAssistant(@Body() data: { courseId: string; assistantId: number }) {
    return this.courseService.unassignAssistant(
      data.courseId,
      data.assistantId,
    );
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @Patch('update-mentor')
  updateMentor(@Body() data: { courseId: string; mentorId: number; mentorData: any }) {
    return this.courseService.updateMentor(data.courseId, data.mentorId, data.mentorData);
  }

  @Post('publish/:id')
  publish(@Param('id') id: string) {
    return this.courseService.publish(id);
  }

  @Post('unpublish/:id')
  unpublish(@Param('id') id: string) {
    return this.courseService.unpublish(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
