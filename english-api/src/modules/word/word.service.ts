import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Dictionary, Word } from '@prisma/client';
import { DictionaryService } from '../dictionary/dictionary.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordForDictionaryResponse } from './response/word-for-dictionary.response';
import { WordResponse } from './response/word.response';
import { WordRepository } from './word.repository';

@Injectable()
export class WordService {
  constructor(
    private readonly wordRepository: WordRepository,
    private readonly dictionaryService: DictionaryService,
  ) {}

  public async createWord(
    userId: number,
    dictionaryId: number,
    createWordDto: CreateWordDto,
  ): Promise<WordForDictionaryResponse> {
    await this.dictionaryService.checkDictionaryOwner(dictionaryId, userId);

    const word = await this.wordRepository.getWord(
      createWordDto.englishSpelling,
      createWordDto.russianSpelling,
    );

    if (
      word &&
      word.dictionaries.find((item: Dictionary) => item.id === dictionaryId)
    ) {
      throw new BadRequestException(
        'This word already exists in this dictionary',
      );
    }

    return await this.wordRepository.createWord(dictionaryId, createWordDto);
  }

  public async updateWord(
    userRoleId: number,
    wordId: number,
    updateWordDto: UpdateWordDto,
  ): Promise<WordResponse> {
    const wordById = await this.wordRepository.getWordById(wordId);

    if (!wordById) {
      throw new HttpException('Word not found', HttpStatus.BAD_REQUEST);
    }

    const word = await this.wordRepository.getWord(
      updateWordDto.englishSpelling,
      updateWordDto.russianSpelling,
    );

    if (word && word.id !== wordId) {
      throw new BadRequestException('Word with this data already exists');
    }

    if (
      userRoleId === 1 &&
      (await this.wordRepository.isAdminDictionaryWord(wordId))
    ) {
      throw new HttpException(
        'You can`t update word from admin dictionary',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.wordRepository.updateWord(wordId, updateWordDto);
  }

  public async removeWordFromDictionary(
    userId: number,
    wordId: number,
    dictionaryId: number,
  ): Promise<void> {
    const word: WordResponse = await this.wordRepository.getWordById(wordId);

    if (!word) {
      throw new HttpException('Word not found', HttpStatus.BAD_REQUEST);
    }

    if (
      !word.dictionaries.some(
        (dictionary) =>
          dictionary.creatorId === userId && dictionary.id === dictionaryId,
      )
    ) {
      throw new HttpException(
        'Impossible remove this word from this dictionary',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.wordRepository.removeWordFromDictionary(wordId, dictionaryId);
  }
}
