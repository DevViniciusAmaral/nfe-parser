import { fastify } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import { uploadNfe } from "./controllers/nfeController";

export const createServer = () => {
  const app = fastify();
  app.register(fastifyMultipart);

  app.post("/", uploadNfe);

  return app;
};
