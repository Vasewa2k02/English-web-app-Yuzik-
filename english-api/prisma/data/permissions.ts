import { Method } from '@prisma/client';

export const permissions = [
  {
    method: Method.GET,
    descriptor: 'AuthController',
    roleId: 1,
  },
  {
    method: Method.GET,
    descriptor: 'AuthController',
    roleId: 2,
  },
  {
    method: Method.POST,
    descriptor: 'AuthController',
    roleId: 1,
    context: 'logout',
  },
  {
    method: Method.POST,
    descriptor: 'AuthController',
    roleId: 2,
    context: 'logout',
  },

  {
    method: Method.POST,
    descriptor: 'AuthController',
    roleId: 1,
    context: 'refresh',
  },
  {
    method: Method.POST,
    descriptor: 'AuthController',
    roleId: 2,
    context: 'refresh',
  },
  {
    method: Method.GET,
    descriptor: 'UserController',
    roleId: 1,
  },
  {
    method: Method.PATCH,
    descriptor: 'UserController',
    roleId: 1,
  },
  {
    method: Method.POST,
    descriptor: 'DictionaryController',
    roleId: 1,
  },
  {
    method: Method.POST,
    descriptor: 'DictionaryController',
    roleId: 2,
  },
  {
    method: Method.GET,
    descriptor: 'DictionaryController',
    roleId: 2,
    context: 'getAdminDictionaries',
  },
  {
    method: Method.GET,
    descriptor: 'DictionaryController',
    roleId: 1,
    context: 'getUserDictionaries',
  },
  {
    method: Method.GET,
    descriptor: 'DictionaryController',
    roleId: 1,
    context: 'getDictionariesForLearn',
  },
  {
    method: Method.PATCH,
    descriptor: 'DictionaryController',
    roleId: 1,
  },
  {
    method: Method.PATCH,
    descriptor: 'DictionaryController',
    roleId: 2,
  },
  {
    method: Method.DELETE,
    descriptor: 'DictionaryController',
    roleId: 1,
  },
  {
    method: Method.DELETE,
    descriptor: 'DictionaryController',
    roleId: 2,
  },
  {
    method: Method.POST,
    descriptor: 'WordController',
    roleId: 1,
  },
  {
    method: Method.POST,
    descriptor: 'WordController',
    roleId: 2,
  },
  {
    method: Method.PATCH,
    descriptor: 'WordController',
    roleId: 1,
  },
  {
    method: Method.PATCH,
    descriptor: 'WordController',
    roleId: 2,
  },
  {
    method: Method.DELETE,
    descriptor: 'WordController',
    roleId: 1,
  },
  {
    method: Method.DELETE,
    descriptor: 'WordController',
    roleId: 2,
  },
  {
    method: Method.GET,
    descriptor: 'UserSettingsController',
    roleId: 1,
  },
  {
    method: Method.PATCH,
    descriptor: 'UserSettingsController',
    roleId: 1,
  },
  {
    method: Method.POST,
    descriptor: 'LessonController',
    roleId: 2,
  },
  {
    method: Method.GET,
    descriptor: 'LessonController',
    roleId: 2,
    context: 'getAdminLessons',
  },
  {
    method: Method.GET,
    descriptor: 'LessonController',
    roleId: 1,
    context: 'getLearnLessons',
  },
  {
    method: Method.PATCH,
    descriptor: 'LessonController',
    roleId: 2,
  },
  {
    method: Method.DELETE,
    descriptor: 'LessonController',
    roleId: 2,
  },
  {
    method: Method.POST,
    descriptor: 'TaskController',
    roleId: 2,
  },
  {
    method: Method.PATCH,
    descriptor: 'TaskController',
    roleId: 2,
  },
  {
    method: Method.DELETE,
    descriptor: 'TaskController',
    roleId: 2,
  },
  {
    method: Method.GET,
    descriptor: 'DictionaryController',
    roleId: 1,
    context: 'getDictionariesLearn',
  },
  {
    method: Method.POST,
    descriptor: 'LexiconProgressController',
    roleId: 1,
  },
  {
    method: Method.POST,
    descriptor: 'StatisticsController',
    roleId: 1,
  },
  {
    method: Method.POST,
    descriptor: 'GrammarProgressController',
    roleId: 1,
  },
  {
    method: Method.GET,
    descriptor: 'StatisticsController',
    roleId: 1,
  },
];
