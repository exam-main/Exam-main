import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { SubmitHomeworkDto } from './dto/submit-homework.dto';
import { CheckHomeworkDto } from './dto/check-homework.dto';

@Injectable()
export class HomeworkService {
  constructor(private prisma: PrismaService) {}

  getByCourse(courseId: string) {
    return this.prisma.homework.findMany({
      where: {
        lesson: {
          group: {
            courseId: courseId,
          },
        },
      },
      include: {
        lesson: {
          include: {
            group: true,
          },
        },
      },
    });
  }

  getDetail(id: number) {
    return this.prisma.homework.findUnique({
      where: { id },
      include: { lesson: true, submissions: true },
    });
  }

  create(dto: CreateHomeworkDto, mentorId?: number) {
    const data: any = { ...dto };

    
    if (mentorId) {
      data.mentorId = mentorId;
    }

    return this.prisma.homework.create({ data });
  }

  update(id: number, dto: UpdateHomeworkDto) {
    return this.prisma.homework.update({ where: { id }, data: dto });
  }

  delete(id: number) {
    return this.prisma.homework.delete({ where: { id } });
  }

  async getMine(userId: number, lessonId: string) {
    const homework = await this.prisma.homework.findFirst({
      where: { lessonId },
    });

    if (!homework) throw new NotFoundException('Homework not found');

    const submission = await this.prisma.homeworkSubmission.findFirst({
      where: { homeworkId: homework.id, userId },
    });

    return { homework, submission };
  }

  async submit(lessonId: string, userId: number, dto: SubmitHomeworkDto) {
    const homework = await this.prisma.homework.findFirst({
      where: { lessonId },
    });

    if (!homework) throw new NotFoundException('Homework not found');

    const oldSubmission = await this.prisma.homeworkSubmission.findFirst({
      where: { homeworkId: homework.id, userId },
    });

    const data: any = {
      userId,
      homeworkId: homework.id,
      status: 'PENDING',
      updatedAt: new Date(),
    };

    if (dto.file !== undefined) data.file = dto.file;
    if (dto.text !== undefined) data.text = dto.text;

    if (oldSubmission) {
      return this.prisma.homeworkSubmission.update({
        where: { id: oldSubmission.id },
        data,
      });
    }

    return this.prisma.homeworkSubmission.create({ data });
  }

  getAllSubmissions() {
    return this.prisma.homeworkSubmission.findMany({
      include: { user: true, homework: true },
    });
  }

  getSingleSubmission(id: number) {
    return this.prisma.homeworkSubmission.findUnique({
      where: { id },
      include: { user: true, homework: true },
    });
  }

  async check(dto: CheckHomeworkDto) {
    return this.prisma.homeworkSubmission.update({
      where: { id: dto.submissionId },
      data: {
        status: dto.status,
        reason: dto.reason,
        updatedAt: new Date(),
      },
    });
  }
}
