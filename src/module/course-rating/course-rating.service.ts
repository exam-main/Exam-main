import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class CourseRatingService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateRatingDto) {
    return this.prisma.rating.create({
      data: {
        rate: dto.rate,
        comment: dto.comment,
        courseId: dto.courseId,
        userId: userId,
      },
    });
  }

  async findLatest() {
    return this.prisma.rating.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }

  async findByCourse(courseId: string) {
    return this.prisma.rating.findMany({
      where: { courseId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAnalytics(courseId: string) {
    const ratings = await this.prisma.rating.findMany({
      where: { courseId },
    });

    const total = ratings.length;
    const average = ratings.reduce((sum, r) => sum + r.rate, 0) / (total || 1);

    return {
      totalRatings: total,
      averageRating: Number(average.toFixed(2)),
    };
  }

  async delete(id: number) {
    return this.prisma.rating.delete({
      where: { id },
    });
  }
}
