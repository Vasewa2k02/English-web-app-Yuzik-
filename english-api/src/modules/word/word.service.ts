import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Dictionary } from '@prisma/client';
import { DictionaryService } from '../dictionary/dictionary.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { WordForDictionaryResponse } from './response/word-for-dictionary.response';
import { WordForSocketResponse } from './response/word-for-socket.response';
import { WordResponse } from './response/word.response';
import { WordRepository } from './word.repository';
import { CreateWordArrayDto } from './dto/create-word-array.dto';

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

  public async createWordArray(
    userId: number,
    dictionaryId: number,
    createWordArrayDto: CreateWordArrayDto,
  ): Promise<CreateWordDto[]> {
    await this.dictionaryService.checkDictionaryOwner(dictionaryId, userId);

    const createdWords = [];

    for (const wordDto of createWordArrayDto.wordArray) {
      const word = await this.wordRepository.getWord(
        wordDto.englishSpelling,
        wordDto.russianSpelling,
      );

      if (
        !(
          word &&
          word.dictionaries.find((item: Dictionary) => item.id === dictionaryId)
        )
      ) {
        createdWords.push(wordDto);
        await this.wordRepository.createWord(dictionaryId, wordDto);
      }
    }

    return createdWords;
  }

  public async getRandomWord(): Promise<WordForSocketResponse> {
    return await this.wordRepository.getRandomWord();
  }

  public async removeWordFromDictionary(
    userId: number,
    wordId: number,
    dictionaryId: number,
  ): Promise<void> {
    const word: WordResponse = await this.wordRepository.getWordById(wordId);

    if (!word) {
      throw new NotFoundException('Word not found');
    }

    if (
      !word.dictionaries.some(
        (dictionary) =>
          dictionary.creatorId === userId && dictionary.id === dictionaryId,
      )
    ) {
      throw new NotFoundException('This word doesn`t exist in this dictionary');
    }

    await this.wordRepository.removeWordFromDictionary(wordId, dictionaryId);
  }

  public async updateWord(
    userRoleId: number,
    wordId: number,
    updateWordDto: UpdateWordDto,
  ): Promise<WordResponse> {
    const wordById = await this.wordRepository.getWordById(wordId);

    if (!wordById) {
      throw new NotFoundException('Word not found');
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
      throw new BadRequestException(
        'You can`t update word from admin dictionary',
      );
    }

    return await this.wordRepository.updateWord(wordId, updateWordDto);
  }
}
