import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { SessionModule } from './modules/session/session.module';
import { MailModule } from './helpers/mail/mail.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { WordModule } from './modules/word/word.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { TaskModule } from './modules/task/task.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { UserSettingsModule } from './modules/user-settings/user-settings.module';
import { LexiconProgressModule } from './modules/lexicon-progress/lexicon-progress.module';
import { GrammarProgressModule } from './modules/grammar-progress/grammar-progress.module';
import { AppGateway } from './app.gateway';
import { TopicModule } from './modules/topic/topic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    UserModule,
    AuthModule,
    DatabaseModule,
    SessionModule,
    MailModule,
    DictionaryModule,
    WordModule,
    LessonModule,
    TaskModule,
    StatisticsModule,
    UserSettingsModule,
    LexiconProgressModule,
    GrammarProgressModule,
    TopicModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
