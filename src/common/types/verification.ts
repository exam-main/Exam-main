export enum EVerificationtypes {
    register = 'register',
    RESET_PASSWORD = 'reset_password',
    EDIT_PHONE = 'edit_phone',
}

export interface ICheckOtp{
    type : EVerificationtypes;
    Phone: string;
    otp : string;
}