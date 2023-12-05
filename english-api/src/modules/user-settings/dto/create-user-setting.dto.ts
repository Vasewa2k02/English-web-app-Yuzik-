import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { LearningMode, UserSettings } from '@prisma/client';
import { swaggerType } from 'src/helpers/swagger/utils';

type UserSettingsType = Pick<
  UserSettings,
  | 'userId'
  | 'countRepeatWordForLearned'
  | 'countRepeatWordsSimultaneously'
  | 'learningModeWords'
  | 'learningModeTasks'
>;

export class CreateUserSettingsDto implements UserSettingsType {
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
  @ApiProperty()
  @IsNumber()
  userId: number;
}
