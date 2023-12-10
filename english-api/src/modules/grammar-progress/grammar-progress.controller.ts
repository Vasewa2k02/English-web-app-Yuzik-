import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { GrammarProgressService } from './grammar-progress.service';
import { CreateGrammarProgressDto } from './dto/create-grammar-progress.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { GrammarProgressResponse } from './response/grammar-progress.response';

@ApiTags('grammar-progress')
@Controller('grammar-progress')
export class GrammarProgressController {
  constructor(
    private readonly grammarProgressService: GrammarProgressService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllByUserId(
    @Req() req: RequestWithUser,
  ): Promise<GrammarProgressResponse[]> {
    return this.grammarProgressService.getAllByUserId(+req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: RequestWithUser,
    @Body() createGrammarProgressDto: CreateGrammarProgressDto,
  ): Promise<void> {
    return this.grammarProgressService.createOrUpdateGrammarProgress(
      +req.user.id,
      createGrammarProgressDto.taskId,
    );
  }
}
