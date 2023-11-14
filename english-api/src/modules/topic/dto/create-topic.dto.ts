import { ApiProperty } from '@nestjs/swagger';
import { Topic } from '@prisma/client';

type CreateTopicType = Pick<Topic, 'name'>;

export class CreateTopicDto implements CreateTopicType {
  @ApiProperty()
  name: string;
}
