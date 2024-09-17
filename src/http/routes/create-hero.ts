import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createHero } from "../functions/create-hero";

export const createHeroRoute: FastifyPluginAsyncZod = async (app) => {
  const heroSchema = z.object({
    titleTechs: z
      .string()
      .min(1, { message: "The title must contain at least 1 character." }),
    title: z
      .string()
      .min(1, { message: "The title must contain at least 1 character." }),
    about: z
      .string()
      .min(50, { message: "The about must contain at least 100 character." }),
    socialMedia: z.array(
      z.object({
        name: z
          .string()
          .min(1, { message: "The name must contain at least 1 character." }),
        url: z
          .string()
          .min(1, { message: "The url must contain at least 1 character." }),
        title: z
          .string()
          .min(1, { message: "The title must contain at least 1 character." }),
        image: z
          .string()
          .min(1, { message: "The image must contain at least 1 character." }),
      })
    ),
    techs: z.array(
      z.object({
        name: z
          .string()
          .min(1, { message: "The name must contain at least 1 character." }),
        image: z.string().url({ message: "The image URL must be valid." }),
      })
    ),
  });

  app.post(
    "/hero",
    {
      schema: {
        body: heroSchema,
      },
    },
    async (request, reply) => {
      const { titleTechs, title, about, socialMedia, techs } = request.body;

      try {
        await createHero({
          titleTechs,
          title,
          about,
          socialMedia,
          techs,
        });

        reply.status(201);
      } catch (error) {
        reply.status(500).send({ error: "Failed to create hero entry" });
      }
    }
  );
};
