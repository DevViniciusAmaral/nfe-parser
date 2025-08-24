import { FastifyInstance } from "fastify";
import { XmlToJsonController } from "../controllers/xml-to-json.controller";

export const DanfeRoutes = async (app: FastifyInstance) => {
  app.post("/xmlToJson", XmlToJsonController);
};
