import { ApiProperty } from '@nestjs/swagger';

export class WordForSocketResponse {
  @ApiProperty()
  description: string;
  @ApiProperty()
  englishSpelling: string;
  @ApiProperty()
  id: number;

  @ApiProperty()
  russianSpelling: string;
}
