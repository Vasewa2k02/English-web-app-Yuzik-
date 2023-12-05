import { ApiProperty } from '@nestjs/swagger';
import { Lesson, Topic } from '@prisma/client';

import { swaggerType } from 'src/helpers/swagger/utils';
import { TaskResponse } from 'src/modules/task/response/task.response';

type LessonResponseType = Omit<Lesson, 'topicId'>;

export class LessonResponse implements LessonResponseType {
  @ApiProperty(swaggerType(TaskResponse))
  tasks: TaskResponse[];
  @ApiProperty()
  topic: Topic;
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  theory: string;
}
