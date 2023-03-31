import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LexiconProgressService } from './lexicon-progress.service';
import { CreateLexiconProgressDto } from './dto/create-lexicon-progress.dto';
import { UpdateLexiconProgressDto } from './dto/update-lexicon-progress.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('lexicon-progress')
@Controller('lexicon-progress')
export class LexiconProgressController {
  constructor(
    private readonly lexiconProgressService: LexiconProgressService,
  ) {}

  @Post()
  create(@Body() createLexiconProgressDto: CreateLexiconProgressDto) {
    return this.lexiconProgressService.create(createLexiconProgressDto);
  }

  @Get()
  findAll() {
    return this.lexiconProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lexiconProgressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLexiconProgressDto: UpdateLexiconProgressDto,
  ) {
    return this.lexiconProgressService.update(+id, updateLexiconProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lexiconProgressService.remove(+id);
  }
}
