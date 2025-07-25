import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './common/core/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { SmsModule } from './common/services/sms.module';

import { AuthModule } from './module/auth/auth.module'; // ✅ Qo‘shildi

import { VerificationModule } from './module/verification/verification.module';
import { ProfileModule } from './module/profile/profile.module';
import { CourseModule } from './module/course/course.module';
import { UsersModule } from './module/users/users.module';
import { CourseCategoryModule } from './module/course-category/course-category.module';
import { CourseRatingModule } from './module/course-rating/course-rating.module';
import { DeviceModule } from './module/device/device.module';
import { PurchasedCourseModule } from './module/purchased-course/purchased-course.module';
import { LessonModule } from './module/lesson/lesson.module';
import { LessonGroupModule } from './module/lesson-group/lesson-group.module';
import { LessonFileModule } from './module/lesson-file/lesson-file.module';
import { ExamModule } from './module/exam/exam.module';
import { HomeworkModule } from './module/homework/homework.module';
import { QuestionModule } from './module/question/question.module';
import { ContactModule } from './module/contact/contact.module';
import { FilesModule } from './module/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RedisModule,
    SmsModule,

    
    AuthModule,

    VerificationModule,
    ProfileModule,
    CourseModule,
    UsersModule,
    CourseCategoryModule,
    CourseRatingModule,
    DeviceModule,
    PurchasedCourseModule,
    LessonModule,
    LessonGroupModule,
    LessonFileModule,
    ExamModule,
    HomeworkModule,
    QuestionModule,
    ContactModule,
    FilesModule,
  ],
})
export class AppModule {}
