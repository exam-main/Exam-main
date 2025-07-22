import { Controller, Get, Patch, Post, Put, Body } from '@nestjs/common';
import { MyProfileService } from './profile.service';
import { UpdateLastActivityDto, UpdateMentorProfileDto, UpdateMyProfileDto, UpdatePasswordDto, UpdatePhoneDto } from './dto/dto';
import { CurrentUser } from 'src/common/decorators/user.decorators';

@Controller('api/my')
export class MyProfileController {
  constructor(private service: MyProfileService) {}

  @Get('profile')
  getMyProfile(@CurrentUser() user) {
    return this.service.getMyProfile(user.id);
  }

  @Patch('profile')
  updateMyProfile(@CurrentUser() user, @Body() dto: UpdateMyProfileDto) {
    return this.service.updateMyProfile(user.id, dto);
  }

  @Get('last-activity')
  getMyLastActivity(@CurrentUser() user) {
    return this.service.getMyLastActivity(user.id);
  }

  @Put('last-activity')
  updateMyLastActivity(@CurrentUser() user, @Body() dto: UpdateLastActivityDto) {
    return this.service.updateMyLastActivity(user.id, dto);
  }

  @Post('phone/update')
  updateMyPhone(@CurrentUser() user, @Body() dto: UpdatePhoneDto) {
    return this.service.updateMyPhone(user.id, dto);
  }

  @Patch('password/update')
  updateMyPassword(@CurrentUser() user, @Body() dto: UpdatePasswordDto) {
    return this.service.updateMyPassword(user.id, dto);
  }

  @Patch('mentor-profile')
  updateMyMentorProfile(@CurrentUser() user, @Body() dto: UpdateMentorProfileDto) {
    return this.service.updateMyMentorProfile(user.id, dto);
  }
}
