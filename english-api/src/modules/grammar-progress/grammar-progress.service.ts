import { Injectable } from '@nestjs/common';
import { CreateGrammarProgressDto } from './dto/create-grammar-progress.dto';
import { UpdateGrammarProgressDto } from './dto/update-grammar-progress.dto';

@Injectable()
export class GrammarProgressService {
  create(createGrammarProgressDto: CreateGrammarProgressDto) {
    return 'This action adds a new grammarProgress';
  }

  findAll() {
    return `This action returns all grammarProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grammarProgress`;
  }

  update(id: number, updateGrammarProgressDto: UpdateGrammarProgressDto) {
    return `This action updates a #${id} grammarProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} grammarProgress`;
  }
}
