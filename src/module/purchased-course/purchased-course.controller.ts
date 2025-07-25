import {
  Controller, Get, Post, Body, Param, Request,
  UseGuards
} from '@nestjs/common';
import { PurchasedCourseService } from './purchased-course.service';
import { CreatePurchasedCourseDto } from './dto/create-purchased-course.dto';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesGuard } from 'src/common/JWT/roles.guard';

@Controller('api/purchased-courses')
@UseGuards(JwtAuthGuard)
export class PurchasedCourseController {
  constructor(private readonly service: PurchasedCourseService) {}

  @Get('mine')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  getMine(@Request() req) {
    return this.service.getMyCourses(req.user.id);
  }

  @Get('mine/:course_id')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  getMyOne(@Request() req, @Param('course_id') courseId: string) {
    return this.service.getMyOne(req.user.id, courseId);
  }

  @Post('purchase')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  purchase(@Request() req, @Body() dto: CreatePurchasedCourseDto) {
    return this.service.purchase(req.user.id, dto);
  }

  @Get('course/:id/students')
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  getCourseStudents(@Param('id') courseId: string) {
    return this.service.getStudentsOfCourse(courseId);
  }

  @Post('create')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  createByAdmin(@Request() req, @Body() dto: CreatePurchasedCourseDto) {
    return this.service.createByAdmin(dto, req.user.id);
  }
}
