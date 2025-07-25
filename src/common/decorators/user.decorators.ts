import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserEntity {
  id: number;
  email: string;
  role: 'STUDENT' | 'MENTOR' | 'ADMIN' | 'ASSISTANT';
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
