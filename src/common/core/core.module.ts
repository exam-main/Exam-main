import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RedisService } from 'src/common/redis/redis.service';

@Global()  // Global qilib belgilash ixtiyoriy, lekin foydali
@Module({
  providers: [PrismaService, RedisService],
  exports: [PrismaService, RedisService],  // Boshqa modullarga ulash uchun
})
export class CoreModule {}
