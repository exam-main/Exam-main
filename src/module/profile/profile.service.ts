import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateLastActivityDto, UpdateMentorProfileDto, UpdateMyProfileDto, UpdatePasswordDto, UpdatePhoneDto } from './dto/dto';

@Injectable()
export class MyProfileService {
  constructor(private prisma: PrismaService) {}

  async getMyProfile(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async updateMyProfile(userId: number, dto: UpdateMyProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        phone: dto.phone,
        fullName: dto.fullName,
        avatarUrl: dto.avatarUrl,
        country: dto.country,
      },
    });
  }

  async getMyLastActivity(userId: number) {
    return this.prisma.lastActivity.findUnique({
      where: { userId },
    });
  }

  async updateMyLastActivity(userId: number, dto: UpdateLastActivityDto) {
    return this.prisma.lastActivity.upsert({
      where: { userId },
      update: dto,
      create: { userId, ...dto },
    });
  }

  async updateMyPhone(userId: number, dto: UpdatePhoneDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { phone: dto.phone },
    });
  }

  async updateMyPassword(userId: number, dto: UpdatePasswordDto) {
    const hashed = await bcrypt.hash(dto.newPassword, 10);
    return this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });
  }

  async updateMyMentorProfile(userId: number, dto: UpdateMentorProfileDto) {
    return this.prisma.mentorProfile.update({
      where: { userId },
      data: dto,
    });
  }
}
