import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { PrismaModule } from 'src/common/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
