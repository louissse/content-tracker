// server/prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.contentItem.createMany({
    data: [
      {
        title: 'Den store skattesag',
        status: 'DRAFT',
        authors: 'editor',
        deadline: new Date('2024-08-01'),
        type: 'ARTICLE',
        createdBy: 'editor',
      },
      {
        title: 'Interview med ministeren',
        status: 'IDEA',
        authors: 'contributor',
        deadline: new Date('2024-08-15'),
        type: 'VIDEO',
        createdBy: 'contributor',
      },
      {
        title: 'Baggrund: Finansloven',
        status: 'REVIEW',
        authors: 'editor, contributor',
        deadline: new Date('2024-07-30'),
        type: 'ARTICLE',
        createdBy: 'editor',
      },
    ],
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())