import { FastifyRequest, FastifyReply } from "fastify";
import { processNfe } from "../services/nfeService";

export async function uploadNfe(request: FastifyRequest, reply: FastifyReply) {
  const data = await request.file();

  if (!data?.file) {
    return reply.status(400).send({ error: "No file was sent" });
  }

  try {
    const buffer = await data.toBuffer();
    const xmlContent = buffer.toString();
    const formattedJson = await processNfe(xmlContent);
    reply.send(formattedJson);
  } catch (error: any) {
    console.error("Error processing XML:", error);
    reply.status(400).send({
      error: "Error processing XML file",
      details: error.message,
    });
  }
}
