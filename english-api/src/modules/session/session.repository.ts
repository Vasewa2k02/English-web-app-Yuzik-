import { Injectable } from '@nestjs/common';
import { Session } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SessionRepository {
  constructor(private readonly db: DatabaseService) {}

  public async createOrUpdateSessionByUserId(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.db.session.upsert({
      where: {
        userId,
      },
      update: { refreshToken },
      create: { refreshToken, userId },
    });
  }

  public async findSessionByUserIdAndFingerprint(
    userId: number,
  ): Promise<Session> {
    return await this.db.session.findUnique({
      where: {
        userId,
      },
    });
  }

  public async removeRefreshToken(userId: number): Promise<void> {
    await this.db.session.delete({
      where: { userId },
    });
  }
}
