import { ApiProperty } from '@nestjs/swagger';
import { Word } from '@prisma/client';

export class WordForDictionaryResponse implements Word {
  @ApiProperty()
  description: string;
  @ApiProperty()
  englishSpelling: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  russianSpelling: string;
  @ApiProperty()
  transcription: string;
}
