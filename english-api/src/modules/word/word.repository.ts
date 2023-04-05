import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordResponse } from './response/word.response';

@Injectable()
export class WordRepository {
  constructor(private readonly db: DatabaseService) {}

  private fullWordSelect = {
    id: true,
    englishSpelling: true,
    transcription: true,
    russianSpelling: true,
    description: true,
    dictionaries: {
      select: {
        id: true,
        name: true,
        description: true,
        creatorId: true,
      },
    },
  };

  public async createWord(
    dictionaryId: number,
    createWordDto: CreateWordDto,
  ): Promise<void> {
    await this.db.word.upsert({
      where: {
        englishSpelling_russianSpelling: {
          englishSpelling: createWordDto.englishSpelling,
          russianSpelling: createWordDto.russianSpelling,
        },
      },
      create: {
        ...createWordDto,
        dictionaries: {
          connect: {
            id: dictionaryId,
          },
        },
      },
      update: {
        dictionaries: {
          connect: {
            id: dictionaryId,
          },
        },
      },
    });
  }

  public async getWordById(id: number): Promise<WordResponse> {
    return await this.db.word.findUnique({
      where: {
        id,
      },
      select: this.fullWordSelect,
    });
  }

  public async updateWord(
    id: number,
    updateWordDto: UpdateWordDto,
  ): Promise<WordResponse> {
    return await this.db.word.update({
      where: {
        id,
      },
      data: {
        ...updateWordDto,
      },
      select: this.fullWordSelect,
    });
  }

  public async removeWordFromDictionary(
    wordId: number,
    dictionaryId: number,
  ): Promise<void> {
    await this.db.word.update({
      where: {
        id: wordId,
      },
      data: {
        dictionaries: {
          disconnect: {
            id: dictionaryId,
          },
        },
      },
    });
  }

  public async isAdminDictionaryWord(id: number): Promise<boolean> {
    return Boolean(
      await this.db.word.count({
        where: {
          id,
          dictionaries: {
            some: {
              user: {
                role: {
                  id: 2,
                },
              },
            },
          },
        },
      }),
    );
  }

  // public async getAdminDictionaries(): Promise<DictionaryResponse[]> {
  //   return await this.db.dictionary.findMany({
  //     where: {
  //       userModel: {
  //         roleId: 2,
  //       },
  //     },
  //     select: this.fullDictionarySelect,
  //   });
  // }

  // public async getUserDictionaries(
  //   creatorId: number,
  // ): Promise<DictionaryResponse[]> {
  //   return await this.db.dictionary.findMany({
  //     where: {
  //       creatorId,
  //     },
  //     select: this.fullDictionarySelect,
  //   });
  // }

  // public async getDictionaryById(id: number): Promise<DictionaryResponse> {
  //   return await this.db.dictionary.findUnique({
  //     where: {
  //       id,
  //     },
  //     select: this.fullDictionarySelect,
  //   });
  // }

  // public async updateDictionaryById(
  //   id: number,
  //   updateDictionaryDto: UpdateDictionaryDto,
  // ): Promise<DictionaryResponse> {
  //   return await this.db.dictionary.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       ...updateDictionaryDto,
  //     },
  //     select: this.fullDictionarySelect,
  //   });
  // }

  // public async removeDictionaryById(id: number): Promise<void> {
  //   await this.db.dictionary.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
