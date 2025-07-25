import { Module } from '@nestjs/common';
import { LessonGroupService } from './lesson-group.service';
import { LessonGroupController } from './lesson-group.controller';
import { PrismaModule } from 'src/common/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LessonGroupController],
  providers: [LessonGroupService],
})
export class LessonGroupModule {}
