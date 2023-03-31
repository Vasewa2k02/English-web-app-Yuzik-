import { PartialType } from '@nestjs/swagger';
import { CreateLexiconProgressDto } from './create-lexicon-progress.dto';

export class UpdateLexiconProgressDto extends PartialType(CreateLexiconProgressDto) {}
