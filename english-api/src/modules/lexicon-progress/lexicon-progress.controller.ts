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
import { LexiconProgressService } from './lexicon-progress.service';
import { CreateLexiconProgressDto } from './dto/create-lexicon-progress.dto';
import { UpdateLexiconProgressDto } from './dto/update-lexicon-progress.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';

@ApiTags('lexicon-progress')
@Controller('lexicon-progress')
export class LexiconProgressController {
  constructor(
    private readonly lexiconProgressService: LexiconProgressService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  private create(
    @Req() req: RequestWithUser,
    @Body() createLexiconProgressDto: CreateLexiconProgressDto,
  ) {
    return this.lexiconProgressService.createOrUpdateLexiconProgress(
      req,
      createLexiconProgressDto,
    );
  }
}
