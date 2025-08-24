import { FastifyInstance } from "fastify";
import { DanfeRoutes } from "./danfe.routes";

export const Routes = async (app: FastifyInstance) => {
  app.register(DanfeRoutes, { prefix: "/danfe" });
};
