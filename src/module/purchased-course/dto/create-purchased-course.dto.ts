import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaidVia } from '@prisma/client';

export class CreatePurchasedCourseDto {
  @ApiProperty({
    example: 'f1234567-89ab-cdef-0123-456789abcdef',
    description: 'Sotib olingan kursning IDsi (UUID formatda)',
  })
  @IsString()
  courseId: string;

  @ApiPropertyOptional({
    example: 199.99,
    description: 'To\'langan summa (ixtiyoriy)',
  })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({
    example: PaidVia.PAYME,
    enum: PaidVia,
    description: 'To\'lov usuli',
  })
  @IsEnum(PaidVia)
  paidVia: PaidVia;
}
