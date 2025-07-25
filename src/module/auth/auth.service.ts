import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';
import { RedisService } from 'src/common/redis/redis.service';
import { RedisClientType } from 'redis';

@Injectable()
export class AuthService implements OnModuleInit {
  private redisClient: RedisClientType;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async onModuleInit() {
    this.redisClient = this.redisService.getClient();
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const {
      username,
      email,
      phone,
      password,
      fullName,
      avatarUrl,
      country,
    } = registerAuthDto;

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
          { phone },
        ],
        // Agar soft-delete bo‘lsa:
        // deletedAt: null,
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'Bunday foydalanuvchi allaqachon mavjud (username/email/telefon).',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        phone,
        password: hashedPassword,
        fullName,
        avatarUrl: avatarUrl ?? 'https://example.com/default-avatar.png',
        country: country ?? 'Uzbekistan',
        role: UserRole.STUDENT,
      },
    });

    const payload = {
      sub: user.id,
      role: user.role,
      username: user.fullName,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    await this.redisClient.set(user.id.toString(), refreshToken, {
      EX: 7 * 24 * 60 * 60, 
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.fullName,
        role: user.role,
      },
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { phone, password } = loginAuthDto;

    const user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      throw new UnauthorizedException('Telefon raqam yoki parol notogri');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Telefon raqam yoki parol notogri');
    }

    const payload = {
      sub: user.id,
      role: user.role,
      username: user.fullName,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    await this.redisClient.set(user.id.toString(), refreshToken, {
      EX: 7 * 24 * 60 * 60,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.fullName,
        role: user.role,
      },
    };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const savedToken = await this.redisClient.get(userId);

    if (!savedToken || savedToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token yaroqsiz');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      role: user.role,
      username: user.fullName,
    };

    const newAccessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    return {
      access_token: newAccessToken,
    };
  }

  async logout(userId: string) {
    await this.redisClient.del(userId);
    return { message: 'Tizimdan chiqildi' };
  }
}
