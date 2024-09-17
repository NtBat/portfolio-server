import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createHero(data: {
  titleTechs: string;
  title: string;
  about: string;
  socialMedia: {
    name: string;
    url: string;
    title: string;
    image: string;
  }[];
  techs: {
    name: string;
    image: string;
  }[];
}) {
  try {
    const hero = await prisma.hero.create({
      data: {
        titleTechs: data.titleTechs,
        title: data.title,
        about: data.about,
        socialMedia: {
          create: data.socialMedia,
        },
        techs: {
          create: data.techs,
        },
      },
    });

    return hero;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
