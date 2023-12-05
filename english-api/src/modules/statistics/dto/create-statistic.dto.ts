import { ApiProperty } from '@nestjs/swagger';

export class CreateStatisticDto {
  @ApiProperty()
  quizPoints?: number;
  @ApiProperty()
  tasks?: number;
  @ApiProperty()
  words?: number;
}
