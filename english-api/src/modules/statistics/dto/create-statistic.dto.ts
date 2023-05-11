import { ApiProperty } from '@nestjs/swagger';

export class CreateStatisticDto {
  @ApiProperty()
  words?: number;

  @ApiProperty()
  tasks?: number;

  @ApiProperty()
  quizPoints?: number;
}
