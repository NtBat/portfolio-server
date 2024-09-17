import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createSeo(data: {
  title: string;
  description: string;
  image: string;
  keywords: string;
}) {
  try {
    const seoEntry = await prisma.seo.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        keywords: data.keywords,
      },
    });

    return seoEntry;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
