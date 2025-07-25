import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreatePurchasedCourseDto } from './dto/create-purchased-course.dto';

@Injectable()
export class PurchasedCourseService {
  constructor(private prisma: PrismaService) {}

  async purchase(userId: number, dto: CreatePurchasedCourseDto) {
    return this.prisma.purchasedCourse.create({
      data: {
        courseId: dto.courseId,
        userId,
        amount: dto.amount,
        paidVia: dto.paidVia,
      },
    });
  }

  async getMyCourses(userId: number) {
    return this.prisma.purchasedCourse.findMany({
      where: { userId },
      include: { course: true },
    });
  }

  async getMyOne(userId: number, courseId: string) {
    return this.prisma.purchasedCourse.findUnique({
      where: {
        courseId_userId: {
          courseId,
          userId,
        },
      },
    });
  }

  async getStudentsOfCourse(courseId: string) {
    return this.prisma.purchasedCourse.findMany({
      where: { courseId },
      include: { user: true },
    });
  }

  async createByAdmin(dto: CreatePurchasedCourseDto, userId: number) {
    return this.prisma.purchasedCourse.create({
      data: {
        courseId: dto.courseId,
        userId,
        amount: dto.amount,
        paidVia: dto.paidVia,
      },
    });
  }
}
