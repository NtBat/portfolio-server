import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { createSeoRoute } from "./routes/create-seo";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { handleZodError } from "../middleware/zod-error";
import { createHeroRoute } from "./routes/create-hero";

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

handleZodError(app);
app.register(createSeoRoute);
app.register(createHeroRoute);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server is running on port 3333`);
  })
  .catch((err) => {
    console.error(err);
  });
