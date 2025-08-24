import { DocumentType, NfeModel, NfeType } from "../enums/danfe-enums";

export interface NfeResponse {
  details: {
    accessKey: string;
    issueDate: string;
    number: string;
    series: string;
    protocol: string;
    operationNature: string;
    model: NfeModel;
    type: NfeType;
    totals: {
      totalProducts: string;
      totalTaxes: string;
      totalFreight: string;
      totalDiscount: string;
      totalInvoice: string;
    };
  };
  issuer: {
    taxId: string;
    name: string;
    address: {
      street: string;
      number: string;
      complement: string;
      district: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    stateRegistration: string;
  };
  recipient: {
    document: {
      type: DocumentType;
      value: string;
    };
    name: string;
    address: {
      street: string;
      number: string;
      complement: string;
      district: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  products: Array<{
    code: string;
    description: string;
    ncm: string;
    quantity: string;
    unit: string;
    unitPrice: string;
    totalPrice: string;
    cfop: string;
    taxes: {
      icms: {
        value: string;
        rate: string;
      };
      pis: {
        value: string;
        rate: string;
      };
      cofins: {
        value: string;
        rate: string;
      };
    };
  }>;
}
