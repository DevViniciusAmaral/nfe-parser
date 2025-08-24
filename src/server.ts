import { fastify } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import { Routes } from "./routes";

export const createServer = () => {
  const app = fastify();

  app.register(fastifyMultipart);
  app.register(Routes);

  return app;
};
