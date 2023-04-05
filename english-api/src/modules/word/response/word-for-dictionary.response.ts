import { ApiProperty } from '@nestjs/swagger';
import { Word } from '@prisma/client';

export class WordForDictionaryResponse implements Word {
  @ApiProperty()
  id: number;

  @ApiProperty()
  englishSpelling: string;

  @ApiProperty()
  transcription: string;

  @ApiProperty()
  russianSpelling: string;

  @ApiProperty()
  description: string;
}
