import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';
import { EVerificationtypes, ICheckOtp } from 'src/common/types/verification';
import { generateOtp } from 'src/common/core/random';
import { secToMills } from 'src/common/core/time';
import { SmsService } from 'src/common/services/sms.service';
import { PrismaService } from 'src/common/core/prisma/prisma.service';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class VerificationService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly smsService: SmsService,
        private readonly redis: RedisService,
    ) {}

    public getkey(type: EVerificationtypes, phone: string, confirmation?: boolean) {
        const storeKeys: Record<EVerificationtypes, string> = {
            [EVerificationtypes.register]: 'req_',
            [EVerificationtypes.RESET_PASSWORD]: 'respass_',
            [EVerificationtypes.EDIT_PHONE]: 'edph_',
        };

        let key = storeKeys[type];
        if (confirmation) {
            key += 'cfm_';
        }
        key += phone;
        return key;
    }

    private getMessage(type: EVerificationtypes, otp: string) {
        switch (type) {
            case EVerificationtypes.register:
                return `Platformadan royxatdan otganingiz uchun ${otp} kod yuborildi`;
            case EVerificationtypes.RESET_PASSWORD:
                return `Parolingizni tiklash uchun ${otp} kod yuborildi`;
            case EVerificationtypes.EDIT_PHONE:
                return `Telefon raqamingizni ozgartirish uchun ${otp} kod yuborildi`;
            default:
                return `Tasdiqlash uchun ${otp} kod yuborildi`;
        }
    }

    private async throwIfUserExists(phone: string) {
        const user = await this.prisma.user.findUnique({
            where: { phone },    
        });

        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
    }

    async sendOtp(payload: SendOtpDto) {
        const { type, phone } = payload;
        const key = this.getkey(type, phone);
        const session = await this.redis.get(key);

        if (session) {
            throw new HttpException('Code already sent', HttpStatus.BAD_REQUEST);
        }

        switch (type) {
            case EVerificationtypes.register:
            case EVerificationtypes.EDIT_PHONE:
            case EVerificationtypes.RESET_PASSWORD:
                await this.throwIfUserExists(phone);
                break;
        }

        const otp = generateOtp();
        await this.redis.set(key, JSON.stringify({ otp }), secToMills(120));
        await this.smsService.sendSMS(this.getMessage(type, otp), phone);

        return { message: 'Confirmation code sent' };
    }

    async verfyOtp(payload: VerifyOtpDto) {
        const { type, phone, otp } = payload;
        const session = await this.redis.get(this.getkey(type, phone));

        if (!session) {
            throw new HttpException('OTP expired', HttpStatus.BAD_REQUEST);
        }

        const sessionOtp = JSON.parse(session).otp;
        if (otp !== sessionOtp) {
            throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
        }

        await this.redis.del(this.getkey(type, phone));
        await this.redis.set(
            this.getkey(type, phone, true),
            JSON.stringify({ otp }),
            secToMills(300),
        );

        return {
            success: true,
            message: 'Verified',
        };
    }

    public async checkConfirmOtp(payload: ICheckOtp) {
        const { type, Phone, otp } = payload;
        const session = await this.redis.get(this.getkey(type, Phone, true));

        if (!session) {
            throw new HttpException('Session expired', HttpStatus.BAD_REQUEST);
        }

        const sessionOtp = JSON.parse(session).otp;
        if (otp !== sessionOtp) {
            throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
        }

        await this.redis.del(this.getkey(type, Phone, true));
        return true;
    }
}
