import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';

type TaskResponseType = Pick<
  Task,
  'id' | 'englishSentence' | 'russianSentence'
>;

export class TaskResponse implements TaskResponseType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  englishSentence: string;

  @ApiProperty()
  russianSentence: string;
}
