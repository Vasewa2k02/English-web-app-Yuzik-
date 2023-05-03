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
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { swaggerType } from 'src/helpers/swagger/utils';
import { WordResponse } from './response/word.response';
import { WordForDictionaryResponse } from './response/word-for-dictionary.response';

@ApiTags('word')
@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  public createWord(
    @Req() req: RequestWithUser,
    @Param('id') dictionaryId: string,
    @Body() createWordDto: CreateWordDto,
  ): Promise<WordForDictionaryResponse> {
    return this.wordService.createWord(
      +req.user.id,
      +dictionaryId,
      createWordDto,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(WordResponse))
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public updateWord(
    @Req() req: RequestWithUser,
    @Param('id') wordId: string,
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<WordResponse> {
    return this.wordService.updateWord(
      +req.user.roleId,
      +wordId,
      updateWordDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/dictionary/:dictionaryId')
  public removeWordFromDictionary(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Param('dictionaryId') dictionaryId: string,
  ): Promise<void> {
    return this.wordService.removeWordFromDictionary(
      +req.user.id,
      +id,
      +dictionaryId,
    );
  }
}
