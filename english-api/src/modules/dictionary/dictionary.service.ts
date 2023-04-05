import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Dictionary } from '@prisma/client';
import { DictionaryRepository } from './dictionary.repository';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryResponse } from './response/dictionary.response';

@Injectable()
export class DictionaryService {
  constructor(private readonly dictionaryRepository: DictionaryRepository) {}

  public async createDictionary(
    creatorId: number,
    createDictionaryDto: CreateDictionaryDto,
  ): Promise<void> {
    await this.dictionaryRepository.createDictionary(
      creatorId,
      createDictionaryDto,
    );
  }

  public async getAdminDictionaries(): Promise<DictionaryResponse[]> {
    return await this.dictionaryRepository.getAdminDictionaries();
  }

  public async getUserDictionaries(id: number): Promise<DictionaryResponse[]> {
    return await this.dictionaryRepository.getUserDictionaries(id);
  }

  public async getDictionariesForLearn(
    id: number,
  ): Promise<DictionaryResponse[]> {
    return (await this.dictionaryRepository.getAdminDictionaries()).concat(
      await this.dictionaryRepository.getUserDictionaries(id),
    );
  }

  public async updateDictionary(
    dictionaryId: number,
    userId: number,
    updateDictionaryDto: UpdateDictionaryDto,
  ): Promise<DictionaryResponse> {
    await this.checkDictionaryOwner(dictionaryId, userId);

    return await this.dictionaryRepository.updateDictionaryById(
      dictionaryId,
      updateDictionaryDto,
    );
  }

  public async removeDictionary(
    dictionaryId: number,
    userId: number,
  ): Promise<void> {
    await this.checkDictionaryOwner(dictionaryId, userId);
    await this.dictionaryRepository.removeDictionaryById(dictionaryId);
  }

  public async checkDictionaryOwner(
    dictionaryId: number,
    userId: number,
  ): Promise<void> {
    const dictionary: Dictionary =
      await this.dictionaryRepository.getDictionaryById(dictionaryId);

    if (!dictionary) {
      throw new HttpException('Dictionary not found', HttpStatus.BAD_REQUEST);
    }

    if (dictionary.creatorId !== userId) {
      throw new HttpException(
        'Not owner try to update dictionary',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
