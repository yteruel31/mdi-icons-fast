import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

interface User {
  id: string;
  name: string;
}

interface Icon {
  id: string;
  name: string;
  aliases: string[];
  data: string;
  user: User;
  commentCount: number;
}

interface Package {
  id: string;
  name: string;
  description: string;
  size: number;
  iconCount: number;
}

interface MdiInfo {
  name: string;
  description: string;
  intro: string;
  packages: Package[];
}

async function getMdiInfo() {
  const res = await axios.get<MdiInfo>(
    'https://materialdesignicons.com/api/init',
  );

  return res.data;
}

async function getIcons(packageId: string) {
  const res = await axios.get<{ icons: Icon[] }>(
    `https://materialdesignicons.com/api/package/${packageId}`,
  );

  return res.data.icons;
}

async function main() {
  console.log(`Start seeding ...`);

  const mdiInfos = await getMdiInfo();
  const icons = await getIcons(mdiInfos.packages[0].id);
  for (const i of icons) {
    const icon = await prisma.icon.create({
      data: {
        ...i,
        user: {
          connectOrCreate: {
            create: i.user,
            where: {
              id: i.user.id,
            },
          },
        },
      },
    });
    console.log(`Created icon with name: ${icon.name}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
