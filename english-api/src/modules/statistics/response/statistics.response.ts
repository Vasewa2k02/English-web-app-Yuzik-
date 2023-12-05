import { ApiProperty } from '@nestjs/swagger';

class UserForStatistics {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class StatisticsResponse {
  @ApiProperty()
  quizPoints: number;
  @ApiProperty()
  tasks: number;
  @ApiProperty()
  user: UserForStatistics;

  @ApiProperty()
  words: number;
}
