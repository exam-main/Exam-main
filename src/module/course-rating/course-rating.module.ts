import { Module } from '@nestjs/common';
import { CourseRatingService } from './course-rating.service';
import { CourseRatingController } from './course-rating.controller';
import { PrismaModule } from 'src/common/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseRatingController],
  providers: [CourseRatingService],
})
export class CourseRatingModule {}
