import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';

@Injectable()
export class CourseCategoryService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCourseCategoryDto) {
    return this.prisma.courseCategory.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.courseCategory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.courseCategory.findUnique({
      where: { id },
      include: { courses: true }, 
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, dto: UpdateCourseCategoryDto) {
    await this.findOne(id);
    return this.prisma.courseCategory.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.courseCategory.delete({ where: { id } });
  }
}
