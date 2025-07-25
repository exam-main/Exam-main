import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseCategoryDto {
  @ApiProperty({
    example: 'Backend dasturlash',
    description: 'Kategoriya nomi. Bu nom unikal bolishi shart emas, lekin bosh bolishi mumkin emas.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
