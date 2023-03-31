import { ApiProperty } from '@nestjs/swagger';
import { Word } from '@prisma/client';

export class WordResponse implements Omit<Word, 'id' | 'description'> {
  @ApiProperty()
  englishSpelling: string;

  @ApiProperty()
  transcription: string;

  @ApiProperty()
  russianSpelling: string;

  @ApiProperty()
  description?: string;
}
