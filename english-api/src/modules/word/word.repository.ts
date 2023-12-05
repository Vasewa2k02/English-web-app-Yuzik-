import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordForDictionaryResponse } from './response/word-for-dictionary.response';
import { WordForSocketResponse } from './response/word-for-socket.response';
import { WordResponse } from './response/word.response';

@Injectable()
export class WordRepository {
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
  private wordForSocketSelect = {
    id: true,
    englishSpelling: true,
    russianSpelling: true,
    description: true,
  };

  constructor(private readonly db: DatabaseService) {}

  public async createWord(
    dictionaryId: number,
    createWordDto: CreateWordDto,
  ): Promise<WordForDictionaryResponse> {
    return await this.db.word.upsert({
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
        ...createWordDto,
        dictionaries: {
          connect: {
            id: dictionaryId,
          },
        },
      },
    });
  }

  public async getRandomWord(): Promise<WordForSocketResponse> {
    const words = await this.db.word.findMany({
      select: this.wordForSocketSelect,
    });

    return words.sort(() => Math.random() - 0.5)[0];
  }

  public async getWord(
    englishSpelling: string,
    russianSpelling: string,
  ): Promise<WordResponse> {
    return await this.db.word.findUnique({
      where: {
        englishSpelling_russianSpelling: {
          englishSpelling,
          russianSpelling,
        },
      },
      select: this.fullWordSelect,
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
}
