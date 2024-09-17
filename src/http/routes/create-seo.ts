import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createSeo } from "../functions/create-seo";

export const createSeoRoute: FastifyPluginAsyncZod = async (app) => {
  const seoSchema = z.object({
    title: z
      .string()
      .min(1, { message: "The title must contain at least 1 character." }),
    description: z.string().min(10, {
      message: "The description must be at least 10 characters long.",
    }),
    image: z.string().url({ message: "The image URL must be valid." }),
    keywords: z
      .string()
      .min(3, { message: "Keywords must contain at least 3 characters." })
      .max(50, { message: "Keywords cannot exceed 50 characters." }),
  });

  app.post(
    "/seo",
    {
      schema: {
        body: seoSchema,
      },
    },
    async (request, reply) => {
      const { title, description, image, keywords } = request.body;

      try {
        await createSeo({
          title,
          description,
          image,
          keywords,
        });

        reply.status(201);
      } catch (error) {
        reply.status(500).send({ error: "Failed to create SEO entry" });
      }
    }
  );
};
