import xmlToJson from "xml-js";

export async function parseXmlToJson(xmlContent: string): Promise<any> {
  return JSON.parse(
    xmlToJson.xml2json(xmlContent, { compact: true, spaces: 4 })
  );
}
