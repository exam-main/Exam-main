import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssistantDto {
  @ApiProperty({
    example: '+998901234567',
    description: 'Assistantning telefon raqami (unikal bolishi kerak)',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'Assistantning toliq ismi',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'securePassword789',
    description: 'Assistant uchun parol',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'f1234567-89ab-cdef-0123-456789abcdef',
    description: 'Biriktiriladigan kursning IDsi (UUID formatda)',
  })
  @IsUUID()
  @IsNotEmpty()
  courseId: string;
}
