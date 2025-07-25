import { Module } from '@nestjs/common';
import { PurchasedCourseService } from './purchased-course.service';
import { PurchasedCourseController } from './purchased-course.controller';
import { PrismaModule } from 'src/common/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PurchasedCourseController],
  providers: [PurchasedCourseService],
})
export class PurchasedCourseModule {}
