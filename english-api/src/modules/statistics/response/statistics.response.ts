import { ApiProperty } from '@nestjs/swagger';

class UserForStatistics {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class StatisticsResponse {
  @ApiProperty()
  user: UserForStatistics;

  @ApiProperty()
  words: number;

  @ApiProperty()
  tasks: number;

  @ApiProperty()
  quizPoints: number;
}
