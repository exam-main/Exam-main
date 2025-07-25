import {
  Controller, Get, Post, Body, Param, Delete, UseGuards, Request,
} from '@nestjs/common';
import { CourseRatingService } from './course-rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesGuard } from 'src/common/JWT/roles.guard';

@Controller('api/course-rating')
export class CourseRatingController {
  constructor(private readonly ratingService: CourseRatingService) {}

  @Get('latest')
  getLatest() {
    return this.ratingService.findLatest();
  }

  @Get('list/:courseId')
  getList(@Param('courseId') courseId: string) {
    return this.ratingService.findByCourse(courseId);
  }

  @Get('analytics/:courseId')
  getAnalytics(@Param('courseId') courseId: string) {
    return this.ratingService.getAnalytics(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateRatingDto) {
    return this.ratingService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.delete(+id);
  }
}
