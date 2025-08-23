# NF-e Parser

A Node.js API built with Fastify and TypeScript to parse Brazilian NF-e (Nota Fiscal Eletrônica) XML files and convert them into a structured JSON format. This project processes NF-e XML files, extracting key details such as invoice information, issuer, recipient, products, and taxes, and returns them in a well-organized JSON response.

## Features

- **XML Parsing**: Converts NF-e XML files to JSON using `xml-js`.
- **Structured JSON Output**: Returns invoice details (access key, issue date, totals, etc.), issuer, recipient, and product information.
- **Type Safety**: Leverages TypeScript with enums for document types (`CPF`/`CNPJ`), NF-e types (`Entrada`/`Saída`), and NF-e models (`55`/`65`).
- **Modular Architecture**: Organized into controllers, services, types, and utilities for maintainability and scalability.
- **File Upload Support**: Handles file uploads via `multipart/form-data` using `@fastify/multipart`.
- **Error Handling**: Provides clear error messages for invalid inputs or XML parsing issues.

## Project Structure

```
nfe-parser/
├── src/
│   ├── controllers/
│   │   └── nfeController.ts
│   ├── services/
│   │   └── nfeService.ts
│   ├── types/
│   │   └── nfeTypes.ts
│   ├── utils/
│   │   └── xmlParser.ts
│   ├── server.ts
│   └── index.ts
├── docs/
│   ├── README.pt-BR.md
│   ├── README.en.md
│   └── index.html
├── package.json
├── tsconfig.json
```

- **controllers/**: Manages HTTP requests and responses.
- **services/**: Contains business logic for processing NF-e XML files.
- **types/**: Defines TypeScript interfaces and enums for the JSON response structure.
- **utils/**: Utility functions, such as XML-to-JSON conversion.
- **server.ts**: Configures the Fastify server and registers routes.
- **index.ts**: Application entry point.

## Installation

1. Clone the repository or download the source code:

   ```bash
   git clone https://github.com/YOUR_USERNAME/nfe-parser.git
   cd nfe-parser
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the TypeScript code:

   ```bash
   npm run build
   ```

## Running the Application

1. Start the server in production mode:

   ```bash
   npm start
   ```

2. For development with auto-reload (using `tsx`):

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`.

## API Usage

### Endpoint: Upload NF-e XML

- **Method**: `POST`
- **URL**: `/`
- **Content-Type**: `multipart/form-data`
- **Body**: A single XML file in NF-e format.

**Example Request (curl)**:

```bash
curl -X POST http://localhost:3000 -F "file=@/path/to/your/nfe.xml"
```

**Example Request (Postman)**:
- Create a new POST request to `http://localhost:3000`.
- In the "Body" tab, select `form-data`.
- Add a key named `file`, set the type to `File`, and upload an NF-e XML file.

**Example Response**:

```json
{
  "invoiceDetails": {
    "accessKey": "35230812345678901234567890123456789012345678",
    "issueDate": "2023-08-01T10:00:00-03:00",
    "nfNumber": "123456",
    "series": "001",
    "protocol": "123456789012345",
    "operationNature": "Venda",
    "model": "55",
    "type": "Saída",
    "totals": {
      "totalProducts": "1000.00",
      "totalTaxes": "180.00",
      "totalFreight": "50.00",
      "totalDiscount": "0.00",
      "totalInvoice": "1230.00"
    }
  },
  "issuer": {
    "taxId": "12345678000195",
    "name": "Empresa Emissora LTDA",
    "address": {
      "street": "Rua Exemplo",
      "number": "123",
      "complement": "Sala 101",
      "district": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01001000",
      "country": "Brasil"
    },
    "stateRegistration": "123456789"
  },
  "recipient": {
    "document": {
      "type": "CNPJ",
      "value": "98765432000191"
    },
    "name": "Cliente Exemplo LTDA",
    "address": {
      "street": "Avenida Teste",
      "number": "456",
      "complement": "",
      "district": "Bairro Novo",
      "city": "Rio de Janeiro",
      "state": "RJ",
      "zipCode": "20001000",
      "country": "Brasil"
    }
  },
  "products": [
    {
      "code": "12345",
      "description": "Produto Exemplo",
      "ncm": "12345678",
      "quantity": "10",
      "unit": "UN",
      "unitPrice": "100.00",
      "totalPrice": "1000.00",
      "cfop": "5102",
      "taxes": {
        "icms": {
          "value": "180.00",
          "rate": "18.00"
        },
        "pis": {
          "value": "16.50",
          "rate": "1.65"
        },
        "cofins": {
          "value": "76.00",
          "rate": "7.60"
        }
      }
    }
  ]
}
```

### Error Responses

- **400 Bad Request (No file sent)**:

  ```json
  {
    "error": "No file was sent"
  }
  ```

- **400 Bad Request (Invalid XML)**:

  ```json
  {
    "error": "Error processing XML file",
    "details": "Invalid or unrecognized XML format"
  }
  ```

## Development

- **TypeScript Compilation**: Run `npm run build` to compile TypeScript to JavaScript in the `dist/` folder.

  ```bash
  npm run build
  ```

- **Development Mode**: Use `tsx` for auto-reload during development:

  ```bash
  npm run dev
  ```

- **Dependencies**:
  - `fastify`: Fast and low-overhead web framework for Node.js.
  - `@fastify/multipart`: Plugin for handling file uploads.
  - `xml-js`: Library for converting XML to JSON.
  - `typescript`: For type checking and compilation.
  - `tsx`: Auto-restarts the server during development.
  - `@types/node`: Type definitions for Node.js.

## Testing

To test the API, you can use tools like `curl`, Postman, or write automated tests. A sample NF-e XML file is recommended for testing. Example test with `curl`:

```bash
curl -X POST http://localhost:3000 -F "file=@/path/to/sample-nfe.xml"
```

For automated tests, consider using a framework like `Jest` or `Mocha`. To add testing support:

1. Install Jest:

   ```bash
   npm install --save-dev jest @types/jest ts-jest
   ```

2. Configure Jest in `package.json` or a `jest.config.js` file.
3. Write tests in a `tests/` folder.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request on GitHub.

## Troubleshooting

- **Error: "No file was sent"**: Ensure the file is correctly attached in the `multipart/form-data` request.
- **Error: "Invalid or unrecognized XML format"**: Verify that the uploaded file is a valid NF-e XML adhering to the SEFAZ standard.
- **Port Conflict**: If port `3000` is in use, update the port in `src/index.ts` or kill the conflicting process:

  ```bash
  lsof -i :3000
  kill -9 <PID>
  ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.