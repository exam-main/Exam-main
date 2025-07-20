import { Module } from '@nestjs/common';
import { VerificationModule } from './module/verification/verification.module';
import { PrismaModule } from './common/core/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { SmsModule } from './common/services/sms.module';
import { ProfileModule } from './module/profile/profile.module';
import { ProfileService } from './module/profile/profile.service';
import { ProfileController } from './module/profile/profile.controller';
import { CourseModule } from './module/course/course.module';
import { MentorsModule } from './module/mentors/mentors.module';

@Module({
  imports: [VerificationModule, PrismaModule, RedisModule,SmsModule, ProfileModule, CourseModule, MentorsModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class AppModule {}
