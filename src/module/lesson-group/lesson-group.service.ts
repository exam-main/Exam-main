import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreateLessonGroupDto } from './dto/create-lesson-group.dto';
import { UpdateLessonGroupDto } from './dto/update-lesson-group.dto';

@Injectable()
export class LessonGroupService {
  constructor(private prisma: PrismaService) {}

  async findAllByCourse(courseId: string) {
    return this.prisma.lessonGroup.findMany({
      where: { courseId },
      include: { lessons: true },
      orderBy: { createdAt: 'asc' }
    });
  }

  async findMineAll(courseId: string) {
    return this.findAllByCourse(courseId);
  }

  async findOne(id: number) {
    return this.prisma.lessonGroup.findUnique({
      where: { id },
      include: {
        lessons: true,
        exams: true,
        examResults: true,
      },
    });
  }

  async create(dto: CreateLessonGroupDto) {
    return this.prisma.lessonGroup.create({ data: dto });
  }

  async update(id: number, dto: UpdateLessonGroupDto) {
    return this.prisma.lessonGroup.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.lessonGroup.delete({ where: { id } });
  }
}
