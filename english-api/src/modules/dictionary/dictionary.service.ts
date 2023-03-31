import { Injectable } from '@nestjs/common';
import { DictionaryRepository } from './dictionary.repository';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryResponse } from './response/dictionary.response';

@Injectable()
export class DictionaryService {
  constructor(private readonly dictionaryRepository: DictionaryRepository) {}

  public async create(
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
}
