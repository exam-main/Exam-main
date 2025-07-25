import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/core/prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.device.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteByToken(token: string) {
    return this.prisma.device.delete({
      where: { deviceToken: token },
    });
  }
}
