import { ApiProperty } from '@nestjs/swagger';

export class WordForSocketResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  englishSpelling: string;

  @ApiProperty()
  russianSpelling: string;

  @ApiProperty()
  description: string;
}
