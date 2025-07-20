import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { PrismaModule } from 'src/common/core/prisma/prisma.module';
import { RedisModule } from 'src/common/redis/redis.module';
import { SmsModule } from 'src/common/services/sms.module';

@Module({
  imports: [PrismaModule, RedisModule, SmsModule],  // ✅ kerakli modullar import qilinishi shart
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],   // ❓ agar boshqa joyda ishlatmoqchi bo‘lsang, export qil
})
export class VerificationModule {}
