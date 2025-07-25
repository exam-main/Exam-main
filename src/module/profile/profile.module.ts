import { Module } from '@nestjs/common';
import { MyProfileController } from './profile.controller';
import { MyProfileService } from './profile.service';
import { PrismaModule } from 'src/common/core/prisma/prisma.module'; 

@Module({
  imports: [PrismaModule], 
  controllers: [MyProfileController],
  providers: [MyProfileService],
})
export class ProfileModule {}
