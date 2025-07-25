import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { CreateAssistantDto } from './dto/create-assistant.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  
async createAdmin(dto: CreateAdminDto) {
  const existing = await this.prisma.user.findUnique({
    where: { phone: dto.phone },
  });

  if (existing) {
    throw new BadRequestException('Bu telefon raqam bilan user mavjud');
  }

  const password = await this.hashPassword(dto.password);

  return this.prisma.user.create({
    data: {
      phone: dto.phone,
      fullName: dto.fullName,
      password,
      role: 'ADMIN',
      username: dto.username, 
      email: dto.email,       
    },
  });
}




  async createMentor(dto: CreateMentorDto) {
    const password = await this.hashPassword(dto.password);

    const user = await this.prisma.user.create({
      data: {
        phone: dto.phone,
        fullName: dto.fullName,
        password: password,
        username: dto.phone,
        email: dto.phone + '@mentor.local',
        role: 'MENTOR',
      },
    });

    await this.prisma.mentorProfile.create({
      data: {
        userId: user.id,
        experience: dto.experience,
        job: dto.job,
        about: dto.about,
        telegram: dto.telegram,
        facebook: dto.facebook,
        instagram: dto.instagram,
        linkedin: dto.linkedin,
        github: dto.github,
        website: dto.website,
      },
    });

    return user;
  }


  async createAssistant(dto: CreateAssistantDto) {
  
    const course = await this.prisma.course.findUnique({
      where: { id: dto.courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

   
    const password = await this.hashPassword(dto.password);

  
    const user = await this.prisma.user.create({
      data: {
        phone: dto.phone,
        fullName: dto.fullName,
        password: password,
        username: dto.phone,
        email: dto.phone + '@assistant.local',
        role: 'ASSISTANT',
      },
    });

    
    await this.prisma.assignedCourse.create({
      data: {
        userId: user.id,
        courseId: dto.courseId,
      },
    });

    return user;
  }

  
  async updateMentor(id: number, dto: UpdateMentorDto) {
    const user = await this.prisma.user.update({
      where: { id, role: 'MENTOR' },
      data: {
        phone: dto.phone,
        fullName: dto.fullName,
      },
    });

    await this.prisma.mentorProfile.update({
      where: { userId: id },
      data: {
        experience: dto.experience,
        job: dto.job,
        about: dto.about,
        telegram: dto.telegram,
        facebook: dto.facebook,
        instagram: dto.instagram,
        linkedin: dto.linkedin,
        github: dto.github,
        website: dto.website,
      },
    });

    return user;
  }


  getMentors() {
    return this.prisma.user.findMany({ where: { role: 'MENTOR' } });
  }

  getMentorById(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id, role: 'MENTOR' },
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getUserById(id: number) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  getByPhone(phone: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { phone } });
  }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
