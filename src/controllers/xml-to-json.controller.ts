import { FastifyRequest, FastifyReply } from "fastify";
import { DanfeService } from "../services/danfe.service";

export async function XmlToJsonController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const data = await request.file();

  if (!data?.file) {
    return reply.status(400).send({ error: "No file was sent" });
  }

  try {
    const xmlContent = (await data.toBuffer()).toString();
    const danfeJson = await DanfeService.xmlToJson(xmlContent);

    reply.status(201).send(danfeJson);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
}
