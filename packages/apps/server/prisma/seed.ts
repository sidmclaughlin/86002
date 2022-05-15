import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Settings
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      threshold_stock_low: 5,
    },
  });

  // Seed Paints
  await prisma.paint.upsert({
    where: { name: 'Blue' },
    update: {},
    create: {
      name: 'Blue',
      hex: '#9AC1DC',
      count: 10,
    },
  });

  await prisma.paint.upsert({
    where: { name: 'Grey' },
    update: {},
    create: {
      name: 'Grey',
      hex: '#A0A09F',
      count: 8,
    },
  });

  await prisma.paint.upsert({
    where: { name: 'Black' },
    update: {},
    create: {
      name: 'Black',
      hex: '#3F3F3E',
      count: 3,
    },
  });

  await prisma.paint.upsert({
    where: { name: 'White' },
    update: {},
    create: {
      name: 'White',
      hex: '#F8F9F3',
      count: 3,
    },
  });

  await prisma.paint.upsert({
    where: { name: 'Purple' },
    update: {},
    create: {
      name: 'Purple',
      hex: '#9076AE',
      count: 15,
    },
  });

  // Seed Roles
  await prisma.role.upsert({
    where: { name: 'Editor' },
    update: {},
    create: {
      name: 'Editor',
    },
  });

  await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
    },
  });

  // Seed Users
  await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John',
      password: '$2a$10$xsMibUoSxRaxL7mEY6VUD.jo9xMcDmvBJL57GjTZ8ohDS.UJ96qla',
    },
  });

  await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      roleId: 1,
      name: 'Jane',
      password: '$2a$10$gmRFMi6MOmiLyy1yEtKplOimj8Qx4jqPuBgZIHuyZv8BEJMjTLmli',
    },
  });

  await prisma.user.upsert({
    where: { email: 'michelangelo@example.com' },
    update: {},
    create: {
      email: 'michelangelo@example.com',
      roleId: 1,
      name: 'Michelangelo',
      password: '$2a$10$VRzY6hpbRvuPlgMPYjQa/uzq4gMuQwu.DuzL9MIjru9t6IO0haagy',
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
