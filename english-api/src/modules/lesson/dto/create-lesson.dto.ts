import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from '@prisma/client';
import { IsString, Matches } from 'class-validator';

type CreateLessonType = Pick<Lesson, 'name' | 'theory'>;

export class CreateLessonDto implements CreateLessonType {
  @ApiProperty()
  @Matches(/^.{2,30}$/)
  name: string;

  @ApiProperty()
  @IsString()
  theory: string;

  @ApiProperty()
  @IsString()
  topicName: string;
}
