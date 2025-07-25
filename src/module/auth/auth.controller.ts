import {
  Controller,
  Post,
  Body,
  Res,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@SetMetadata('IsPublic', true)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Foydalanuvchi royxatdan otadi' })
  @ApiBody({ type: RegisterAuthDto })
  @ApiResponse({ status: 201, description: 'Royxatdan otish muvaffaqiyatli' })
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Foydalanuvchi tizimga kiradi' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login' })
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Tizimdan chiqish (refresh tokenni ochirish)' })
  @ApiResponse({ status: 200, description: 'Tizimdan muvaffaqiyatli chiqildi' })
  async logout(
    @Body('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(userId);
    res.clearCookie('Auth_token');
    return { message: 'Tizimdan muvaffaqiyatli chiqildi' };
  }

  @Post('/refresh-token')
  @ApiOperation({ summary: 'Yangi access token olish' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: 'user-uuid' },
        refreshToken: { type: 'string', example: 'your-refresh-token' },
      },
      required: ['userId', 'refreshToken'],
    },
  })
  @ApiResponse({ status: 200, description: 'Yangi access token qaytarildi' })
  async refreshToken(
    @Body() body: { userId: string; refreshToken: string },
  ) {
    return this.authService.refreshToken(body.userId, body.refreshToken);
  }
}
