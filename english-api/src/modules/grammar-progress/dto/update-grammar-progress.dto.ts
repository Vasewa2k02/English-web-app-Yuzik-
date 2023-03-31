import { PartialType } from '@nestjs/swagger';
import { CreateGrammarProgressDto } from './create-grammar-progress.dto';

export class UpdateGrammarProgressDto extends PartialType(CreateGrammarProgressDto) {}
