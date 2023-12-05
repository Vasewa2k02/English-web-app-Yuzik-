import { ApiProperty } from '@nestjs/swagger';
import { LearningMode, User, UserSettings } from '@prisma/client';
import { IsNumber } from 'class-validator';

type UserSettingsType = Pick<
  UserSettings,
  | 'countRepeatWordForLearned'
  | 'countRepeatWordsSimultaneously'
  | 'learningModeWords'
  | 'learningModeTasks'
>;

export class UserSettingsResponse implements UserSettingsType {
  @ApiProperty()
  @IsNumber()
  countRepeatWordForLearned: number;

  @ApiProperty()
  @IsNumber()
  countRepeatWordsSimultaneously: number;
  @ApiProperty()
  learningModeTasks: LearningMode;
  @ApiProperty()
  learningModeWords: LearningMode;
}
