import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './common/core/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { SmsModule } from './common/services/sms.module';

import { VerificationModule } from './module/verification/verification.module';
import { ProfileModule } from './module/profile/profile.module';
import { CourseModule } from './module/course/course.module';
import { UsersModule } from './module/users/users.module';
import { CourseCategoryModule } from './module/course-category/course-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,        
    }),
    PrismaModule,
    RedisModule,
    SmsModule,
    VerificationModule,
    ProfileModule,
    CourseModule,
    UsersModule,
    CourseCategoryModule,
  ],
})
export class AppModule {}
