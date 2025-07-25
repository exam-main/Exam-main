import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { PrismaModule } from 'src/common/core/prisma/prisma.module';
import { RedisModule } from 'src/common/redis/redis.module';
import { SmsModule } from 'src/common/services/sms.module';

@Module({
  imports: [PrismaModule, RedisModule, SmsModule],  
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],   
})
export class VerificationModule {}
