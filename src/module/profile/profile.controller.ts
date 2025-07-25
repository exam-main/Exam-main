import {
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { MyProfileService } from './profile.service';
import {
  UpdateLastActivityDto,
  UpdateMentorProfileDto,
  UpdateMyProfileDto,
  UpdatePasswordDto,
  UpdatePhoneDto,
} from './dto/dto';
import { CurrentUser, UserEntity } from 'src/common/decorators/user.decorators';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';

@ApiTags('My Profile')
@UseGuards(JwtAuthGuard)
@Controller('api/my')
export class MyProfileController {
  constructor(private service: MyProfileService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Mening profilimni olish' })
  @ApiResponse({ status: 200, description: 'Profil maʼlumotlari' })
  getMyProfile(@CurrentUser() user: UserEntity) {
    return this.service.getMyProfile(user.id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Profilni yangilash' })
  @ApiBody({ type: UpdateMyProfileDto })
  @ApiResponse({ status: 200, description: 'Profil muvaffaqiyatli yangilandi' })
  updateMyProfile(@CurrentUser() user: UserEntity, @Body() dto: UpdateMyProfileDto) {
    return this.service.updateMyProfile(user.id, dto);
  }

  @Get('last-activity')
  @ApiOperation({ summary: 'Oxirgi faollikni olish' })
  @ApiResponse({ status: 200, description: 'Oxirgi faollik malumotlari' })
  getMyLastActivity(@CurrentUser() user: UserEntity) {
    return this.service.getMyLastActivity(user.id);
  }

  @Put('last-activity')
  @ApiOperation({ summary: 'Oxirgi faollikni yangilash' })
  @ApiBody({ type: UpdateLastActivityDto })
  @ApiResponse({ status: 200, description: 'Oxirgi faollik yangilandi' })
  updateMyLastActivity(@CurrentUser() user: UserEntity, @Body() dto: UpdateLastActivityDto) {
    return this.service.updateMyLastActivity(user.id, dto);
  }

  @Post('phone/update')
  @ApiOperation({ summary: 'Telefon raqamni yangilash' })
  @ApiBody({ type: UpdatePhoneDto })
  @ApiResponse({ status: 200, description: 'Telefon raqam yangilandi' })
  updateMyPhone(@CurrentUser() user: UserEntity, @Body() dto: UpdatePhoneDto) {
    return this.service.updateMyPhone(user.id, dto);
  }

  @Patch('password/update')
  @ApiOperation({ summary: 'Parolni yangilash' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli yangilandi' })
  updateMyPassword(@CurrentUser() user: UserEntity, @Body() dto: UpdatePasswordDto) {
    return this.service.updateMyPassword(user.id, dto);
  }

  @Patch('mentor-profile')
  @ApiOperation({ summary: 'Mentor profilini yangilash' })
  @ApiBody({ type: UpdateMentorProfileDto })
  @ApiResponse({ status: 200, description: 'Mentor profili muvaffaqiyatli yangilandi' })
  updateMyMentorProfile(@CurrentUser() user: UserEntity, @Body() dto: UpdateMentorProfileDto) {
    return this.service.updateMyMentorProfile(user.id, dto);
  }
}
