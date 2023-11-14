import { ApiProperty } from '@nestjs/swagger';

type TopicResponseType = Pick<TopicResponse, 'id' | 'name'>;

export class TopicResponse implements TopicResponseType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
