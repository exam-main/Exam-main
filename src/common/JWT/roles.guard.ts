import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { ROLES_KEY } from 'src/common/decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // request.user bo'lishi kerak, agar yo'q bo'lsa Unauthorized
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi aniqlanmadi');
    }

    // Foydalanuvchini DBdan tekshirish
    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      throw new ForbiddenException('Foydalanuvchi topilmadi');
    }

    // Kerakli rollarni olish
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Agar rol belgilanmagan bo'lsa, har kim kirishi mumkin
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Agar foydalanuvchining roli kerakli rollardan biri bo'lsa ruxsat berish
    if (requiredRoles.includes(dbUser.role)) {
      return true;
    }

    throw new ForbiddenException('Sizga bu amalni bajarishga ruxsat yo‘q');
  }
}
