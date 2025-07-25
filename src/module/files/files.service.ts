import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { access } from 'fs/promises';
import { PrismaService } from 'src/common/core/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async getPublicFile(name: string): Promise<string> {
    const filePath = join(__dirname, '..', '..', '..', 'public', name);
    await access(filePath).catch(() => {
      throw new NotFoundException('File not found');
    });
    return filePath;
  }

  async getPrivateLessonFile(lessonId: string, name: string, userId: number): Promise<string> {
    const lesson = await this.prisma.lesson.findFirst({
      where: { id: lessonId },
      include: { group: true },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    

    const filePath = join(__dirname, '..', '..', '..', 'uploads', 'lesson-files', lessonId, name);
    await access(filePath).catch(() => {
      throw new NotFoundException('File not found');
    });
    return filePath;
  }

  async getLessonVideoSegment(lessonId: string, hlsf: string, userId: number): Promise<string> {
    const lesson = await this.prisma.lesson.findFirst({
      where: { id: lessonId },
      include: { group: true },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    

    const filePath = join(__dirname, '..', '..', '..', 'uploads', 'hls', lessonId, hlsf);
    await access(filePath).catch(() => {
      throw new NotFoundException('Video segment not found');
    });
    return filePath;
  }
}
