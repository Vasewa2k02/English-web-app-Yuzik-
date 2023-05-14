import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Dictionary } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { DictionaryRepository } from './dictionary.repository';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryReviewResponse } from './response/dictionary-review.response';
import { DictionaryResponse } from './response/dictionary.response';

@Injectable()
export class DictionaryService {
  constructor(private readonly dictionaryRepository: DictionaryRepository) {}

  public async createDictionary(
    creatorId: number,
    createDictionaryDto: CreateDictionaryDto,
  ): Promise<DictionaryResponse> {
    return await this.dictionaryRepository.createDictionary(
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

  public async getDictionariesReview(
    id: number,
  ): Promise<DictionaryReviewResponse[]> {
    return await this.dictionaryRepository.getDictionariesReview(id);
  }

  public async getDictionariesLearn(
    id: number,
  ): Promise<DictionaryReviewResponse[]> {
    const data = await this.dictionaryRepository.getDictionariesLearn(id);

    data.forEach((dictionary) => {
      dictionary.words = dictionary.words.filter(
        (word) =>
          word.lexiconProgress[0] === undefined ||
          word.lexiconProgress[0].isLearned === false,
      );
    });

    return data;
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
      throw new NotFoundException('Dictionary not found');
    }

    if (dictionary.creatorId !== userId) {
      throw new BadRequestException('Not owner try to update dictionary');
    }
  }
}
