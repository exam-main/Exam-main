import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { PrismaModule } from 'src/common/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
