import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { MentorsController } from './mentors.controller';

@Module({
  providers: [MentorsService],
  controllers: [MentorsController]
})
export class MentorsModule {}
