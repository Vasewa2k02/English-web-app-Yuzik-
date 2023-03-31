import { Injectable } from '@nestjs/common';
import { CreateLexiconProgressDto } from './dto/create-lexicon-progress.dto';
import { UpdateLexiconProgressDto } from './dto/update-lexicon-progress.dto';

@Injectable()
export class LexiconProgressService {
  create(createLexiconProgressDto: CreateLexiconProgressDto) {
    return 'This action adds a new lexiconProgress';
  }

  findAll() {
    return `This action returns all lexiconProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lexiconProgress`;
  }

  update(id: number, updateLexiconProgressDto: UpdateLexiconProgressDto) {
    return `This action updates a #${id} lexiconProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} lexiconProgress`;
  }
}
