const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^.+$/;
const PASSWORD_REGEX = /^.{4,16}$/;

const DICTIONARY_NAME_REGEX = /^.{2,30}$/;
const DICTIONARY_DESCRIPTION_REGEX = /^.{0,30}$/;

const WORD_ENGLISH_REGEX = /^[a-z-]{1,30}$/;
const WORD_TRANSCRIPTION_REGEX = /^.{1,60}$/;
const WORD_RUSSIAN_REGEX = /^[а-я-]{1,30}$/;
const WORD_DESCRIPTION_REGEX = /^.{0,30}$/;

const LESSON_NAME_REGEX = /^.{2,30}$/;
const LESSON_THEORY_REGEX = /^.{1,5000}$/;

const ENGLISH_SENTENCE_REGEX = /^[a-zA-Z.,:;!?'`— ]{2,300}$/;
const RUSSIAN_SENTENCE_REGEX = /^[а-яА-Я.,:;!?'`— ]{2,300}$/;

const PUNCTUATION_MARKS = /[.,:;!?\s]+/;

export const REGEXES = {
  PUNCTUATION_MARKS,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  DICTIONARY_NAME_REGEX,
  DICTIONARY_DESCRIPTION_REGEX,
  WORD_ENGLISH_REGEX,
  WORD_TRANSCRIPTION_REGEX,
  WORD_RUSSIAN_REGEX,
  WORD_DESCRIPTION_REGEX,
  LESSON_NAME_REGEX,
  LESSON_THEORY_REGEX,
  ENGLISH_SENTENCE_REGEX,
  RUSSIAN_SENTENCE_REGEX,
};
