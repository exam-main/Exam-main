import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreateLessonFileDto } from './dto/create-lesson-file.dto';

@Injectable()
export class LessonFileService {
  constructor(private prisma: PrismaService) {}

  async findByLessonId(lessonId: string) {
    return this.prisma.lessonFile.findMany({
      where: { lessonId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateLessonFileDto) {
    return this.prisma.lessonFile.create({
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.lessonFile.delete({
      where: { id },
    });
  }
}
