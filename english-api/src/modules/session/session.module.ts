import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { SessionRepository } from './session.repository';
import { SessionService } from './session.service';

@Module({
  imports: [DatabaseModule],
  providers: [SessionService, SessionRepository],
  exports: [SessionService],
})
export class SessionModule {}
