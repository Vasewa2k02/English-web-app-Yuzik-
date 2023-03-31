import { Injectable } from '@nestjs/common';
import { Dictionary } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { DictionaryResponse } from './response/dictionary.response';

@Injectable()
export class DictionaryRepository {
  constructor(private readonly db: DatabaseService) {}

  private fullDictionarySelect = {
    name: true,
    description: true,
    creatorId: true,
    words: {
      select: {
        englishSpelling: true,
        transcription: true,
        russianSpelling: true,
        description: true,
      },
    },
  };

  public async createDictionary(
    creatorId: number,
    createDictionaryDto: CreateDictionaryDto,
  ): Promise<void> {
    await this.db.dictionary.create({
      data: {
        creatorId,
        ...createDictionaryDto,
      },
    });
  }

  public async getAdminDictionaries(): Promise<DictionaryResponse[]> {
    return await this.db.dictionary.findMany({
      where: {
        userModel: {
          roleId: 2,
        },
      },
      select: this.fullDictionarySelect,
    });
  }

  public async getUserDictionaries(
    creatorId: number,
  ): Promise<DictionaryResponse[]> {
    return await this.db.dictionary.findMany({
      where: {
        creatorId,
      },
      select: this.fullDictionarySelect,
    });
  }
}
