import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HomeworkSubStatus } from '@prisma/client';

export class CheckHomeworkDto {
  @ApiProperty({
    example: 42,
    description: 'Homework submission ID',
  })
  @IsInt()
  submissionId: number;

  @ApiProperty({
    enum: HomeworkSubStatus,
    example: HomeworkSubStatus.REJECTED,
    description: 'Status of the homework submission',
  })
  @IsEnum(HomeworkSubStatus)
  status: HomeworkSubStatus;

  @ApiPropertyOptional({
    example: 'File is incomplete or incorrect format.',
    description: 'Optional reason if status is not accepted',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
