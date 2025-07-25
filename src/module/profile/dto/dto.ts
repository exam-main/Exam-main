import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMyProfileDto {
  @ApiPropertyOptional({ example: '+998901234567', description: 'Telefon raqam' })
  phone?: string;

  @ApiPropertyOptional({ example: 'Ali Valiyev', description: 'To‘liq ism' })
  fullName?: string;

  @ApiPropertyOptional({ example: 'https://cdn.site.com/avatar.jpg', description: 'Avatar URL manzili' })
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'Uzbekistan', description: 'Davlat nomi' })
  country?: string;
}

export class UpdateLastActivityDto {
  @ApiProperty({ example: 'lesson_123', description: 'Dars ID' })
  lessonId: string;

  @ApiProperty({ example: '/lesson/123', description: 'Sahifa URL manzili' })
  pageUrl: string;

  @ApiPropertyOptional({ example: '2025-07-23T12:34:56Z', description: 'Yangilangan vaqt' })
  updatedAt?: Date;
}

export class UpdatePhoneDto {
  @ApiProperty({ example: '+998901112233', description: 'Yangi telefon raqam' })
  phone: string;
}

export class UpdatePasswordDto {
  @ApiProperty({ example: 'NewSecureP@ssw0rd', description: 'Yangi parol' })
  newPassword: string;
}

export class UpdateMentorProfileDto {
  @ApiProperty({ example: 5, description: 'Tajriba yillari' })
  experience: number;

  @ApiProperty({ example: 'Senior Backend Developer', description: 'Kasb' })
  job: string;

  @ApiProperty({ example: 'Men NestJS ustasiman.', description: 'O‘zim haqimda qisqacha' })
  about: string;

  @ApiPropertyOptional({ example: 'https://t.me/username', description: 'Telegram profili' })
  telegram?: string;

  @ApiPropertyOptional({ example: 'https://facebook.com/username', description: 'Facebook profili' })
  facebook?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/username', description: 'Instagram profili' })
  instagram?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/username', description: 'LinkedIn profili' })
  linkedin?: string;

  @ApiPropertyOptional({ example: 'https://github.com/username', description: 'GitHub profili' })
  github?: string;

  @ApiPropertyOptional({ example: 'https://myportfolio.com', description: 'Shaxsiy vebsayt' })
  website?: string;
}
