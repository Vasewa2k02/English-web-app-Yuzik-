import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  public async createOrUpdateSessionByUserId(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    await this.sessionRepository.createOrUpdateSessionByUserId(
      userId,
      refreshToken,
    );
  }

  public async getRefreshToken(userId: number): Promise<string> {
    const session =
      await this.sessionRepository.findSessionByUserIdAndFingerprint(userId);

    if (!session) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return session.refreshToken;
  }

  public async removeRefreshToken(userId: number): Promise<void> {
    await this.sessionRepository.removeRefreshToken(userId);
  }
}
