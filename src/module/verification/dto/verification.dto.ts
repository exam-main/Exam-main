import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMobilePhone,  IsString } from "class-validator";
import { EVerificationtypes } from "src/common/types/verification";




export class SendOtpDto{
    @ApiProperty({
        enum: EVerificationtypes,
    })
    @IsEnum(EVerificationtypes)
    type:EVerificationtypes;

    @ApiProperty({
        example: '+998998378098',
    })
    @IsMobilePhone('uz-UZ')
    @IsString()
    phone: string;
}


export class VerifyOtpDto extends SendOtpDto{
    @ApiProperty({
        example: '000000',
    })
    @IsString()
    otp: String;
}