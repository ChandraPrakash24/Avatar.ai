const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: 'React' },
        { name: 'Libraries' },
        { name: 'Languages' },
        { name: 'Tools' },
        { name: 'Framework' },
        { name: 'Bash' },
        { name: 'SQL' },
      ],
    });
  } catch (error) {
    console.error('Error seeding default categories:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
