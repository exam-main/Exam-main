import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLessonDto) {
    return this.prisma.lesson.create({ data: dto });
  }

  async findOneForStudent(id: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async incrementViewCount(lessonId: string, userId: number) {
    return this.prisma.lessonView.upsert({
      where: {
        lessonId_userId: {
          lessonId,
          userId,
        },
      },
      update: {
        view: true,
      },
      create: {
        lessonId,
        userId,
        view: true,
      },
    });
  }

  async findDetail(id: string) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: {
        group: true,
        homework: true,
        lessonFiles: true,
      },
    });
  }

  async update(id: string, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
