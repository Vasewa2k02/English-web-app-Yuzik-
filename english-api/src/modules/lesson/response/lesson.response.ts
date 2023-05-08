import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from '@prisma/client';

import { swaggerType } from 'src/helpers/swagger/utils';
import { TaskResponse } from 'src/modules/task/response/task.response';

export class LessonResponse implements Lesson {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  theory: string;

  @ApiProperty()
  passingPercent: number;

  @ApiProperty(swaggerType(TaskResponse))
  tasks: TaskResponse[];
}
