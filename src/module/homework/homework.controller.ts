import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { Roles } from 'src/common/decorators/roles.decorators';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';
import { RolesGuard } from 'src/common/JWT/roles.guard';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { SubmitHomeworkDto } from './dto/submit-homework.dto';
import { CheckHomeworkDto } from './dto/check-homework.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/homework')
export class HomeworkController {
  constructor(private service: HomeworkService) {}
  
  @Get('course/:id')
  @Roles(UserRole.MENTOR, UserRole.ADMIN, UserRole.ASSISTANT)
  getByCourse(@Param('id') id: string) {
    return this.service.getByCourse(id);
  }
  
  @Get('detail/:id')
  @Roles(UserRole.MENTOR, UserRole.ADMIN, UserRole.ASSISTANT)
  getDetail(@Param('id', ParseIntPipe) id: number) {
    return this.service.getDetail(id);
  }
  
  @Post('create')
  @Roles(UserRole.MENTOR, UserRole.ADMIN)
  create(@Body() dto: CreateHomeworkDto, @Req() req) {
    const mentorId = req.user.id;
    return this.service.create(dto, mentorId);
  }

  @Patch('update/:id')
  @Roles(UserRole.MENTOR, UserRole.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHomeworkDto) {
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  @Roles(UserRole.MENTOR, UserRole.ADMIN)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Get('submission/mine/:lessonId')
  @Roles(UserRole.STUDENT)
  getMine(@Req() req, @Param('lessonId') lessonId: string) {
    return this.service.getMine(req.user.id, lessonId);
  }

  @Post('submission/submit/:lessonId')
  @Roles(UserRole.STUDENT)
  submit(
    @Req() req,
    @Param('lessonId') lessonId: string,
    @Body() dto: SubmitHomeworkDto,
  ) {
    return this.service.submit(lessonId, req.user.id, dto);
  }

  @Get('submissions/all')
  @Roles(UserRole.MENTOR, UserRole.ADMIN, UserRole.ASSISTANT)
  getAll() {
    return this.service.getAllSubmissions();
  }

  @Get('submissions/single/:id')
  @Roles(UserRole.MENTOR, UserRole.ADMIN, UserRole.ASSISTANT)
  getSingle(@Param('id', ParseIntPipe) id: number) {
    return this.service.getSingleSubmission(id);
  }

  @Post('submission/check')
  @Roles(UserRole.MENTOR, UserRole.ADMIN, UserRole.ASSISTANT)
  check(@Body() dto: CheckHomeworkDto) {
    return this.service.check(dto);
  }
}
