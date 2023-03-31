import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { swaggerType } from 'src/helpers/swagger/utils';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryResponse } from './response/dictionary.response';

@ApiTags('dictionary')
@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Post()
  public create(
    @Req() req: RequestWithUser,
    @Body() createDictionaryDto: CreateDictionaryDto,
  ): Promise<void> {
    return this.dictionaryService.create(+req.user.id, createDictionaryDto);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse(swaggerType(DictionaryResponse))
  @Get('admin')
  public getAdminDictionaries(): Promise<DictionaryResponse[]> {
    return this.dictionaryService.getAdminDictionaries();
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse(swaggerType(DictionaryResponse))
  @Get('user')
  public getUserDictionaries(
    @Req() req: RequestWithUser,
  ): Promise<DictionaryResponse[]> {
    return this.dictionaryService.getUserDictionaries(+req.user.id);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse(swaggerType(DictionaryResponse))
  @Get('learn')
  public getDictionariesForLearn(
    @Req() req: RequestWithUser,
  ): Promise<DictionaryResponse[]> {
    return this.dictionaryService.getDictionariesForLearn(+req.user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dictionaryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDictionaryDto: UpdateDictionaryDto,
  // ) {
  //   return this.dictionaryService.update(+id, updateDictionaryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dictionaryService.remove(+id);
  // }
}
