import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GrammarProgressService } from './grammar-progress.service';
import { CreateGrammarProgressDto } from './dto/create-grammar-progress.dto';
import { UpdateGrammarProgressDto } from './dto/update-grammar-progress.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('grammar-progress')
@Controller('grammar-progress')
export class GrammarProgressController {
  constructor(
    private readonly grammarProgressService: GrammarProgressService,
  ) {}

  @Post()
  create(@Body() createGrammarProgressDto: CreateGrammarProgressDto) {
    return this.grammarProgressService.create(createGrammarProgressDto);
  }

  @Get()
  findAll() {
    return this.grammarProgressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grammarProgressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGrammarProgressDto: UpdateGrammarProgressDto,
  ) {
    return this.grammarProgressService.update(+id, updateGrammarProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grammarProgressService.remove(+id);
  }
}
