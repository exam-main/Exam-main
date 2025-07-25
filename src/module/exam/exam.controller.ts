import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesGuard } from 'src/common/JWT/roles.guard';
import { PassExamDto } from './dto/pass-exam.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/exams')
@UseGuards(JwtAuthGuard)
export class ExamController {
  constructor(private readonly service: ExamService) {}
  @ApiBearerAuth()
  @Get('lesson-group/:lessonGroupId')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  getByLessonGroup(@Param('lessonGroupId') id: number) {
    return this.service.findByLessonGroup(Number(id));
  }
  @ApiBearerAuth()
  @Post('pass')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  pass(@Request() req, @Body() body: Omit<PassExamDto, 'userId'>) {
    return this.service.passExam({ ...body, userId: req.user.id });
  }
  @ApiBearerAuth()
  @Get('lesson-group/details/:id')
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  details(@Param('id') id: number) {
    return this.service.findDetailsByLessonGroup(Number(id));
  }
  @ApiBearerAuth()
  @Get('detail/:id')
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  getOne(@Param('id') id: number) {
    return this.service.findOne(Number(id));
  }
  @ApiBearerAuth()
  @Post('create')
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  create(@Body() dto: CreateExamDto) {
    return this.service.create(dto);
  }
  @ApiBearerAuth()
  @Post('create/many')
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  createMany(@Body() dtos: CreateExamDto[]) {
    return this.service.createMany(dtos);
  }
  @ApiBearerAuth()
  @Patch('update/:id')
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  update(@Param('id') id: number, @Body() dto: UpdateExamDto) {
    return this.service.update(Number(id), dto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @Roles('MENTOR', 'ADMIN')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: number) {
    return this.service.remove(Number(id));
  }
  @ApiBearerAuth()
  @Get('results')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  allResults() {
    return this.service.getAllResults();
  }
  @ApiBearerAuth()
  @Get('results/lesson-group/:id')
  @Roles('MENTOR')
  @UseGuards(RolesGuard)
  resultsByGroup(@Param('id') id: number) {
    return this.service.getResultsByLessonGroup(Number(id));
  }
}
