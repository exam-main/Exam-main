import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateHomeworkDto {
  @ApiPropertyOptional({
    example: 'Yangi topshiriq matni',
    description: 'Topshiriq matnini yangilash uchun (ixtiyoriy)',
  })
  @IsOptional()
  @IsString()
  task?: string;

  @ApiPropertyOptional({
    example: 'uploads/homeworks/updated_file.pdf',
    description: 'Topshiriqqa bog‘langan faylni yangilash uchun (ixtiyoriy)',
  })
  @IsOptional()
  @IsString()
  file?: string;
}
