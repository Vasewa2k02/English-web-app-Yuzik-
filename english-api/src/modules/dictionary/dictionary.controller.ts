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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { swaggerType } from 'src/helpers/swagger/utils';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryReviewResponse } from './response/dictionary-review.response';
import { DictionaryResponse } from './response/dictionary.response';

@ApiTags('dictionary')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  public createDictionary(
    @Req() req: RequestWithUser,
    @Body() createDictionaryDto: CreateDictionaryDto,
  ): Promise<DictionaryResponse> {
    return this.dictionaryService.createDictionary(
      +req.user.id,
      createDictionaryDto,
    );
  }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(DictionaryResponse))
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  public getAdminDictionaries(): Promise<DictionaryResponse[]> {
    return this.dictionaryService.getAdminDictionaries();
  }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(DictionaryResponse))
  @UseGuards(JwtAuthGuard)
  @Get('user')
  public getUserDictionaries(
    @Req() req: RequestWithUser,
  ): Promise<DictionaryResponse[]> {
    return this.dictionaryService.getUserDictionaries(+req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(DictionaryResponse))
  @UseGuards(JwtAuthGuard)
  @Get('review')
  public getDictionariesReview(
    @Req() req: RequestWithUser,
  ): Promise<DictionaryReviewResponse[]> {
    return this.dictionaryService.getDictionariesReview(+req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(DictionaryResponse))
  @UseGuards(JwtAuthGuard)
  @Get('learn')
  public getDictionariesLearn(
    @Req() req: RequestWithUser,
  ): Promise<DictionaryReviewResponse[]> {
    return this.dictionaryService.getDictionariesLearn(+req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse(swaggerType(DictionaryResponse))
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public updateDictionary(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() updateDictionaryDto: UpdateDictionaryDto,
  ): Promise<DictionaryResponse> {
    return this.dictionaryService.updateDictionary(
      +id,
      +req.user.id,
      updateDictionaryDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public remove(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    return this.dictionaryService.removeDictionary(+id, +req.user.id);
  }
}
