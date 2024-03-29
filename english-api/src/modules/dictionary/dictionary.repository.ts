import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryResponse } from './response/dictionary.response';
import { WordForExportResponse } from '../word/response/word-for-export.response';

@Injectable()
export class DictionaryRepository {
  private dictionariesReviewSelect = {
    id: true,
    name: true,
    description: true,
    creatorId: true,
    words: {
      select: {
        id: true,
        englishSpelling: true,
        transcription: true,
        russianSpelling: true,
        description: true,
        lexiconProgress: {
          select: {
            progressCount: true,
            isLearned: true,
          },
        },
      },
    },
  };
  private fullDictionarySelect = {
    id: true,
    name: true,
    description: true,
    creatorId: true,
    words: {
      select: {
        id: true,
        englishSpelling: true,
        transcription: true,
        russianSpelling: true,
        description: true,
      },
    },
  };

  constructor(private readonly db: DatabaseService) {}

  public async createDictionary(
    creatorId: number,
    createDictionaryDto: CreateDictionaryDto,
  ): Promise<DictionaryResponse> {
    return await this.db.dictionary.create({
      data: {
        creatorId,
        ...createDictionaryDto,
      },
      select: this.fullDictionarySelect,
    });
  }

  public async exportDictionaryById(
    id: number,
  ): Promise<WordForExportResponse[]> {
    const dictionary = await this.db.dictionary.findMany({
      where: {
        id,
      },
      select: {
        words: {
          select: {
            englishSpelling: true,
            transcription: true,
            russianSpelling: true,
            description: true,
          },
        },
      },
    });

    return dictionary[0].words;
  }

  public async getAdminDictionaries(): Promise<DictionaryResponse[]> {
    return await this.db.dictionary.findMany({
      where: {
        user: {
          roleId: 2,
        },
      },
      select: this.fullDictionarySelect,
    });
  }

  public async getDictionariesLearn(creatorId: number): Promise<any[]> {
    return await this.db.dictionary.findMany({
      where: {
        OR: [{ creatorId }, { user: { roleId: 2 } }],
      },
      select: {
        id: true,
        name: true,
        description: true,
        creatorId: true,
        words: {
          select: {
            id: true,
            englishSpelling: true,
            transcription: true,
            russianSpelling: true,
            description: true,
            lexiconProgress: {
              where: {
                userId: creatorId,
              },
              select: {
                id: true,
                progressCount: true,
                isLearned: true,
              },
              take: 1,
            },
          },
        },
      },
    });
  }

  public async getDictionariesReview(creatorId: number): Promise<any[]> {
    return await this.db.dictionary.findMany({
      where: {
        OR: [{ creatorId }, { user: { roleId: 2 } }],
      },
      select: {
        id: true,
        name: true,
        description: true,
        creatorId: true,
        words: {
          select: {
            id: true,
            englishSpelling: true,
            transcription: true,
            russianSpelling: true,
            description: true,
            lexiconProgress: {
              where: {
                userId: creatorId,
              },
              select: {
                progressCount: true,
                isLearned: true,
              },
              take: 1,
            },
          },
        },
      },
    });
  }

  public async getDictionaryById(id: number): Promise<DictionaryResponse> {
    return await this.db.dictionary.findUnique({
      where: {
        id,
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

  public async removeDictionaryById(id: number): Promise<void> {
    await this.db.dictionary.delete({
      where: {
        id,
      },
    });
  }

  public async updateDictionaryById(
    id: number,
    updateDictionaryDto: UpdateDictionaryDto,
  ): Promise<DictionaryResponse> {
    return await this.db.dictionary.update({
      where: {
        id,
      },
      data: {
        ...updateDictionaryDto,
      },
      select: this.fullDictionarySelect,
    });
  }
}
