import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function handleZodError(app: FastifyInstance) {
  app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      reply.status(400).send({
        statusCode: 400,
        error: "Validation Error",
        message: "Invalid input data",
        errors: formattedErrors,
      });
    } else {
      reply.send(error);
    }
  });
}
