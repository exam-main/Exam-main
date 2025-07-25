import { Controller, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';

@Controller('api/device')
@UseGuards(JwtAuthGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  getAll() {
    return this.deviceService.findAll();
  }

  @Delete(':deviceToken')
  delete(@Param('deviceToken') deviceToken: string) {
    return this.deviceService.deleteByToken(deviceToken);
  }
}
