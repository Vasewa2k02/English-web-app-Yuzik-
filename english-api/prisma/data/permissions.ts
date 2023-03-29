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
    method: Method.GET,
    descriptor: 'UserController',
    roleId: 1,
  },
  {
    method: Method.PATCH,
    descriptor: 'UserController',
    roleId: 1,
  },
];
