import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CoreModule } from 'src/common/core/core.module';
import { RedisModule } from 'src/common/redis/redis.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/JWT/JWT.strategy'; 
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard'; 

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CoreModule,
    RedisModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,  
    JwtAuthGuard, 
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
