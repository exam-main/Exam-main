import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto, UpdateQuestionDto, AnswerDto, CheckAnswerDto } from './dto';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesGuard } from 'src/common/JWT/roles.guard';
import { RolesEnum } from 'src/common/enums/roles.enums';
import { AuthUser } from 'src/common/decorators/auth-user.decarators';
import { UserEntity } from 'src/common/decorators/user.decorators';

@Controller('api/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  
  @Get('mine')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.STUDENT)
  getMine(@AuthUser() user: UserEntity) {
    return this.questionService.getMine(user.id);
  }

  @Get('course/:courseId')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.MENTOR, RolesEnum.ADMIN, RolesEnum.ASSISTANT)
  getByCourse(@Param('courseId') courseId: string) {
    return this.questionService.getByCourse(courseId);
  }

  @Get('single/:id')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.STUDENT, RolesEnum.MENTOR, RolesEnum.ADMIN, RolesEnum.ASSISTANT)
  getSingle(@Param('id') id: number) {
    return this.questionService.getSingle(id);
  }

  @Post('read/:id')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.MENTOR, RolesEnum.ADMIN, RolesEnum.ASSISTANT)
  markAsRead(@Param('id') id: number) {
    return this.questionService.markAsRead(id);
  }
  
  @Post('create/:courseId')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.STUDENT)
  create(
    @Param('courseId') courseId: string,
    @AuthUser() user: UserEntity,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionService.create(courseId, user.id, dto);
  }

  @Patch('update/:id')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.STUDENT)
  update(@Param('id') id: number, @Body() dto: UpdateQuestionDto) {
    return this.questionService.update(id, dto);
  }

  @Post('answer/:id')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.MENTOR, RolesEnum.ASSISTANT)
  createAnswer(@Param('id') id: number, @AuthUser() user: UserEntity, @Body() dto: AnswerDto) {
    return this.questionService.createAnswer(id, user.id, dto);
  }

  @Patch('answer/:id')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.MENTOR, RolesEnum.ASSISTANT, RolesEnum.ADMIN)
  updateAnswer(@Param('id') id: number, @Body() dto: AnswerDto) {
    return this.questionService.updateAnswer(id, dto);
  }

  @Delete('answer/delete/:id')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.MENTOR, RolesEnum.ASSISTANT, RolesEnum.ADMIN)
  deleteAnswer(@Param('id') id: number) {
    return this.questionService.deleteAnswer(id);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.STUDENT)
  deleteQuestion(@Param('id') id: number) {
    return this.questionService.delete(id);
  }
}
