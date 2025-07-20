import { Body, Controller, Post } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';
import { ICheckOtp } from 'src/common/types/verification';

@Controller('verification')
export class VerificationController {
    constructor(private readonly verificationService: VerificationService) {}

    @Post('send')
    async sendOtp(@Body() payload: SendOtpDto) {
        return await this.verificationService.sendOtp(payload);
    }

    @Post('verify')
    async verifyOtp(@Body() payload: VerifyOtpDto) {
        return await this.verificationService.verfyOtp(payload);
    }

    @Post('check')
    async checkOtp(@Body() payload: ICheckOtp) {
        return await this.verificationService.checkConfirmOtp(payload);
    }
}
