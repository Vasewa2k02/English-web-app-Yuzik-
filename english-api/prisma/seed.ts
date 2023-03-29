import { PrismaClient } from '@prisma/client';

import { roles } from './data/roles';
import { permissions } from './data/permissions';
import { users } from './data/users';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: roles,
  });

  await prisma.permission.createMany({
    data: permissions,
  });

  await prisma.user.createMany({
    data: users,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
