import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { CreateAssistantDto } from './dto/create-assistant.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create/admin')
  createAdmin(@Body() dto: CreateAdminDto) {
    return this.userService.createAdmin(dto);
  }

  @Post('create/mentor')
  createMentor(@Body() dto: CreateMentorDto) {
    return this.userService.createMentor(dto);
  }

  @Post('create/assistant')
  createAssistant(@Body() dto: CreateAssistantDto) {
    return this.userService.createAssistant(dto);
  }

  @Patch('update/mentor/:id')
  updateMentor(@Param('id') id: string, @Body() dto: UpdateMentorDto) {
    return this.userService.updateMentor(+id, dto);
  }

  @Get('mentors')
  getMentors() {
    return this.userService.getMentors();
  }

  @Get('mentors/:id')
  getMentorById(@Param('id') id: string) {
    return this.userService.getMentorById(+id);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('single/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Get('by-phone/:phone')
  getByPhone(@Param('phone') phone: string) {
    return this.userService.getByPhone(phone);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
