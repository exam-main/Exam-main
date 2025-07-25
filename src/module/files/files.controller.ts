import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/common/JWT/jwt-auth-guard';
import { RolesGuard } from 'src/common/JWT/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { RolesEnum } from 'src/common/enums/roles.enums';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { UserEntity } from 'src/common/decorators/user.decorators';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('public/:name')
  async getPublicFile(@Param('name') name: string, @Res() res: Response) {
    const file = await this.filesService.getPublicFile(name);
    return res.sendFile(file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.STUDENT)
  @Get('private/lesson-file/:lessonId/:name')
  async getLessonFile(
    @Param('lessonId') lessonId: string,
    @Param('name') name: string,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    const file = await this.filesService.getPrivateLessonFile(lessonId, name, user.id);
    return res.sendFile(file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.STUDENT)
  @Get('private/video/:lessonId/:hlsf')
  async getLessonVideoSegment(
    @Param('lessonId') lessonId: string,
    @Param('hlsf') hlsf: string,
    @CurrentUser() user: UserEntity,
    @Res() res: Response,
  ) {
    const segment = await this.filesService.getLessonVideoSegment(lessonId, hlsf, user.id);
    return res.sendFile(segment);
  }
}
