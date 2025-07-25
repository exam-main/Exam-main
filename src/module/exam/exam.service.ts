import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  findByLessonGroup(lessonGroupId: number) {
    return this.prisma.exam.findMany({
      where: { lessonGroupId },
    });
  }

  findDetailsByLessonGroup(id: number) {
    return this.prisma.lessonGroup.findUnique({
      where: { id },
      include: { exams: true },
    });
  }

  findOne(id: number) {
    return this.prisma.exam.findUnique({
      where: { id },
    });
  }

  create(dto: CreateExamDto) {
    return this.prisma.exam.create({ data: dto });
  }

  createMany(dtos: CreateExamDto[]) {
    return this.prisma.exam.createMany({
      data: dtos,
      skipDuplicates: true,
    });
  }

  update(id: number, dto: UpdateExamDto) {
    return this.prisma.exam.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.exam.delete({ where: { id } });
  }

  getAllResults() {
    return this.prisma.examResult.findMany({
      include: {
        user: true,
        lessonGroup: true,
      },
    });
  }

  getResultsByLessonGroup(lessonGroupId: number) {
    return this.prisma.examResult.findMany({
      where: { lessonGroupId },
      include: {
        user: true,
        lessonGroup: true,
      },
    });
  }

  async passExam(data: {
    examId: number;
    userId: number;
    lessonGroupId: number;
    selectedAnswers: { [questionId: number]: string };
  }) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: data.examId },
      include: { questions: true },
    });

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }

    let corrects = 0;
    let wrongs = 0;

    for (const question of exam.questions) {
      const selectedAnswer = data.selectedAnswers[question.id];
      if (selectedAnswer) {
        if (selectedAnswer === question.correctAnswer) {
          corrects++;
        } else {
          wrongs++;
        }
      }
    }

    const passed = corrects >= Math.ceil(exam.questions.length * 0.6); // to‘g‘rilandi

    return this.prisma.examResult.create({
      data: {
        examId: data.examId,
        userId: data.userId,
        lessonGroupId: data.lessonGroupId,
        corrects,
        wrongs,
        passed,
      },
    });
  }
}
