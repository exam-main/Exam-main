import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreateQuestionDto, UpdateQuestionDto, AnswerDto } from './dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  getMine(userId: number) {
    return this.prisma.question.findMany({
      where: { userId },
      include: { answer: true },
    });
  }

  getByCourse(courseId: string) {
    return this.prisma.question.findMany({
      where: { courseId },
      include: { user: true, answer: true },
    });
  }

  getSingle(id: number) {
    return this.prisma.question.findUnique({
      where: { id },
      include: { user: true, answer: true },
    });
  }

  async markAsRead(id: number) {
    const question = await this.prisma.question.findUnique({ where: { id } });
    if (!question) throw new NotFoundException('Question not found');

    return this.prisma.question.update({
      where: { id },
      data: { read: true, readAt: new Date() },
    });
  }

  create(courseId: string, userId: number, dto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: { ...dto, courseId, userId },
    });
  }

  update(id: number, dto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: { id },
      data: dto,
    });
  }

  createAnswer(questionId: number, userId: number, dto: AnswerDto) {
    return this.prisma.questionAnswer.create({
      data: { ...dto, userId, questionId },
    });
  }

  updateAnswer(questionId: number, dto: AnswerDto) {
    return this.prisma.questionAnswer.update({
      where: { questionId },
      data: dto,
    });
  }

  deleteAnswer(questionId: number) {
    return this.prisma.questionAnswer.delete({
      where: { questionId },
    });
  }

  delete(id: number) {
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
