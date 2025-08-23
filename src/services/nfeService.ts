import { parseXmlToJson } from "../utils/xmlParser";
import { NfeResponse, DocumentType, NfeType, NfeModel } from "../types/nfeTypes";

export async function processNfe(xmlContent: string): Promise<NfeResponse> {
  const rawJson = await parseXmlToJson(xmlContent);
  const nfe = rawJson?.nfeProc?.NFe?.infNFe;
  const nfeProc = rawJson?.nfeProc;

  if (!nfe) {
    throw new Error("Invalid or unrecognized XML format");
  }

  const formattedJson: NfeResponse = {
    invoiceDetails: {
      accessKey: nfe._attributes?.Id?.replace('NFe', '') || "",
      issueDate: nfe.ide?.dhEmi?._text || "",
      nfNumber: nfe.ide?.nNF?._text || "",
      series: nfe.ide?.serie?._text || "",
      protocol: nfeProc?.protNFe?.infProt?.nProt?._text || "",
      operationNature: nfe.ide?.natOp?._text || "",
      model: (nfe.ide?.mod?._text as NfeModel) || NfeModel.NFE,
      type: nfe.ide?.tpNF?._text === "1" ? NfeType.SAIDA : NfeType.ENTRADA,
      totals: {
        totalProducts: nfe.total?.ICMSTot?.vProd?._text || "0.00",
        totalTaxes: nfe.total?.ICMSTot?.vICMS?._text || "0.00",
        totalFreight: nfe.total?.ICMSTot?.vFrete?._text || "0.00",
        totalDiscount: nfe.total?.ICMSTot?.vDesc?._text || "0.00",
        totalInvoice: nfe.total?.ICMSTot?.vNF?._text || "0.00"
      }
    },
    issuer: {
      taxId: nfe.emit?.CNPJ?._text || "",
      name: nfe.emit?.xNome?._text || "",
      address: {
        street: nfe.emit?.enderEmit?.xLgr?._text || "",
        number: nfe.emit?.enderEmit?.nro?._text || "",
        complement: nfe.emit?.enderEmit?.xCpl?._text || "",
        district: nfe.emit?.enderEmit?.xBairro?._text || "",
        city: nfe.emit?.enderEmit?.xMun?._text || "",
        state: nfe.emit?.enderEmit?.UF?._text || "",
        zipCode: nfe.emit?.enderEmit?.CEP?._text || "",
        country: nfe.emit?.enderEmit?.xPais?._text || ""
      },
      stateRegistration: nfe.emit?.IE?._text || ""
    },
    recipient: {
      document: {
        type: nfe.dest?.CPF ? DocumentType.CPF : DocumentType.CNPJ,
        value: nfe.dest?.CPF?._text || nfe.dest?.CNPJ?._text || ""
      },
      name: nfe.dest?.xNome?._text || "",
      address: {
        street: nfe.dest?.enderDest?.xLgr?._text || "",
        number: nfe.dest?.enderDest?.nro?._text || "",
        complement: nfe.dest?.enderDest?.xCpl?._text || "",
        district: nfe.dest?.enderDest?.xBairro?._text || "",
        city: nfe.dest?.enderDest?.xMun?._text || "",
        state: nfe.dest?.enderDest?.UF?._text || "",
        zipCode: nfe.dest?.enderDest?.CEP?._text || "",
        country: nfe.dest?.enderDest?.xPais?._text || ""
      }
    },
    products: []
  };

  // Processar produtos
  if (nfe.det) {
    if (!Array.isArray(nfe.det)) {
      formattedJson.products.push({
        code: nfe.det.prod?.cProd?._text || "",
        description: nfe.det.prod?.xProd?._text || "",
        ncm: nfe.det.prod?.NCM?._text || "",
        quantity: nfe.det.prod?.qCom?._text || "",
        unit: nfe.det.prod?.uCom?._text || "",
        unitPrice: nfe.det.prod?.vUnCom?._text || "",
        totalPrice: nfe.det.prod?.vProd?._text || "",
        cfop: nfe.det.prod?.CFOP?._text || "",
        taxes: {
          icms: {
            value: nfe.det.imposto?.ICMS?.ICMS00?.vICMS?._text || "0.00",
            rate: nfe.det.imposto?.ICMS?.ICMS00?.pICMS?._text || "0.00"
          },
          pis: {
            value: nfe.det.imposto?.PIS?.PISAliq?.vPIS?._text || "0.00",
            rate: nfe.det.imposto?.PIS?.PISAliq?.pPIS?._text || "0.00"
          },
          cofins: {
            value: nfe.det.imposto?.COFINS?.COFINSAliq?.vCOFINS?._text || "0.00",
            rate: nfe.det.imposto?.COFINS?.COFINSAliq?.pCOFINS?._text || "0.00"
          }
        }
      });
    } else {
      nfe.det.forEach((item: any) => {
        formattedJson.products.push({
          code: item.prod?.cProd?._text || "",
          description: item.prod?.xProd?._text || "",
          ncm: item.prod?.NCM?._text || "",
          quantity: item.prod?.qCom?._text || "",
          unit: item.prod?.uCom?._text || "",
          unitPrice: item.prod?.vUnCom?._text || "",
          totalPrice: item.prod?.vProd?._text || "",
          cfop: item.prod?.CFOP?._text || "",
          taxes: {
            icms: {
              value: item.imposto?.ICMS?.ICMS00?.vICMS?._text || "0.00",
              rate: item.imposto?.ICMS?.ICMS00?.pICMS?._text || "0.00"
            },
            pis: {
              value: item.imposto?.PIS?.PISAliq?.vPIS?._text || "0.00",
              rate: item.imposto?.PIS?.PISAliq?.pPIS?._text || "0.00"
            },
            cofins: {
              value: item.imposto?.COFINS?.COFINSAliq?.vCOFINS?._text || "0.00",
              rate: item.imposto?.COFINS?.COFINSAliq?.pCOFINS?._text || "0.00"
            }
          }
        });
      });
    }
  }

  return formattedJson;
}