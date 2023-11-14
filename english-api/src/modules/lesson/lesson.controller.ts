import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { LessonResponse } from './response/lesson.response';
import { swaggerType } from 'src/helpers/swagger/utils';

@ApiTags('lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createLesson(
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<LessonResponse> {
    return this.lessonService.createLesson(createLessonDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(LessonResponse))
  @UseGuards(JwtAuthGuard)
  @Get()
  public getAdminLessons(): Promise<LessonResponse[]> {
    return this.lessonService.getLessons();
  }

  // @ApiBearerAuth()
  // @ApiOkResponse(swaggerType(LessonResponse))
  // @UseGuards(JwtAuthGuard)
  // @Get('learn')
  // public getLearnLessons(
  //   @Req() req: RequestWithUser,
  // ): Promise<LessonResponse[]> {
  //   return this.lessonService.getLearnLessons(req);
  // }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(LessonResponse))
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public updateLesson(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<LessonResponse> {
    return this.lessonService.updateLesson(+id, updateLessonDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public remove(@Param('id') id: string): Promise<void> {
    return this.lessonService.removeLesson(+id);
  }
}
