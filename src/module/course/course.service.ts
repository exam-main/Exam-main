import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AssignAssistantDto } from './dto/assign-assistant.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async findOneFull(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        category: true,
        mentor: true,
        assignedCourses: { include: { user: true } },
        purchasedCourses: true,
        ratings: true,
        lastActivities: true,
        lessonGroups: true,
        questions: true,
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async findAllAdmin() {
    return this.prisma.course.findMany({ include: { mentor: true, category: true } });
  }

  async findMyCourses(mentorId: number) {
    return this.prisma.course.findMany({ where: { mentorId } });
  }

  async findByMentor(mentorId: number) {
    return this.findMyCourses(mentorId);
  }

  async findMyAssigned(assistantId: number) {
    return this.prisma.assignedCourse.findMany({
      where: { userId: assistantId },
      include: { course: true },
    });
  }

  async findAssistants(courseId: string) {
    return this.prisma.assignedCourse.findMany({
      where: { courseId },
      include: { user: true },
    });
  }

  async assignAssistant(courseId: string, assistantId: number) {
    return this.prisma.assignedCourse.create({
      data: { courseId, userId: assistantId },
    });
  }

  async unassignAssistant(courseId: string, assistantId: number) {
    return this.prisma.assignedCourse.delete({
      where: {
        userId_courseId: {
          userId: assistantId,
          courseId,
        },
      },
    });
  }

  async create(dto: CreateCourseDto) {
   
    const category = await this.prisma.courseCategory.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    
    const mentor = await this.prisma.user.findUnique({
      where: { id: dto.mentorId },
    });

    if (!mentor) {
      throw new NotFoundException('Mentor not found');
    }

   
    return this.prisma.course.create({
      data: {
        name: dto.name,
        about: dto.about,
        price: dto.price,
        banner: dto.banner,
        introVideo: dto.introVideo,
        level: dto.level,
        mentorId: dto.mentorId,
        categoryId: dto.categoryId,
      },
    });
  }

  async update(id: string, dto: UpdateCourseDto) {
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  async updateMentor(courseId: string, mentorId: number, mentorData: any) {
    await this.prisma.course.update({ where: { id: courseId }, data: { mentorId } });
    return this.prisma.user.update({ where: { id: mentorId }, data: mentorData });
  }

  async publish(id: string) {
    return this.prisma.course.update({ where: { id }, data: { published: true } });
  }

  async unpublish(id: string) {
    return this.prisma.course.update({ where: { id }, data: { published: false } });
  }

  async delete(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }
}
