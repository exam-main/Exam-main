import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';

@ApiTags('Courses')
@Controller('api/courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new course' })
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all published courses' })
  findAll() {
    return this.courseService.findAll();
  }

  @Get('single/:id')
  @ApiOperation({ summary: 'Get one course by ID' })
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Get('single-full/:id')
  @ApiOperation({ summary: 'Get full course with relations' })
  findOneFull(@Param('id') id: string) {
    return this.courseService.findOneFull(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all courses (admin only)' })
  findAllAdmin() {
    return this.courseService.findAllAdmin();
  }

  @Get('my')
  @ApiOperation({ summary: 'Get courses by mentor ID' })
  findMyCourses(@Query('mentorId', ParseIntPipe) mentorId: number) {
    return this.courseService.findMyCourses(mentorId);
  }

  @Get('mentor/:id')
  @ApiOperation({ summary: 'Get courses for specific mentor' })
  findByMentor(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findByMentor(id);
  }

  @Get('my/assigned')
  @ApiOperation({ summary: 'Get courses assigned to assistant' })
  findMyAssigned(@Query('assistantId', ParseIntPipe) assistantId: number) {
    return this.courseService.findMyAssigned(assistantId);
  }

  @Get(':courseId/assistants')
  @ApiOperation({ summary: 'Get assistants assigned to a course' })
  findAssistants(@Param('courseId') courseId: string) {
    return this.courseService.findAssistants(courseId);
  }

  @Post('assign-assistant')
  @ApiOperation({ summary: 'Assign assistant to a course' })
  assignAssistant(@Body() data: { courseId: string; assistantId: number }) {
    return this.courseService.assignAssistant(data.courseId, data.assistantId);
  }

  @Post('unassign-assistant')
  @ApiOperation({ summary: 'Unassign assistant from a course' })
  unassignAssistant(@Body() data: { courseId: string; assistantId: number }) {
    return this.courseService.unassignAssistant(
      data.courseId,
      data.assistantId,
    );
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update course data' })
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @Patch('update-mentor')
  @ApiOperation({ summary: 'Update mentor information in a course' })
  @ApiBody({ type: UpdateMentorDto })
  updateMentor(@Body() dto: UpdateMentorDto) {
    const { courseId, mentorId, mentorData } = dto;
    if (!courseId || !mentorId || !mentorData) {
      throw new Error('Missing courseId, mentorId, or mentorData in request body');
    }
    return this.courseService.updateMentor(courseId, mentorId, mentorData);
  }

  @Post('publish/:id')
  @ApiOperation({ summary: 'Publish a course' })
  publish(@Param('id') id: string) {
    return this.courseService.publish(id);
  }

  @Post('unpublish/:id')
  @ApiOperation({ summary: 'Unpublish a course' })
  unpublish(@Param('id') id: string) {
    return this.courseService.unpublish(id);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a course' })
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
