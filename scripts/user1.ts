// seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.companion.create({
    data: {
        userId: 'test_user_id1', // Replace with a unique user ID
        userName: 'TestUser',
        src: 'https://example.com/avatar.jpg', // URL to user's avatar
        name: 'Test User',
        description: 'This is a test user.',
        instructions: 'Test user instructions go here.',
        seed: 'Test user seed text goes here.',
        categoryId: '26e09a78-a959-4748-b982-07741b75b208',
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
