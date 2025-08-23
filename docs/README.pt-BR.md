# Parser de NF-e

Uma API Node.js construída com Fastify e TypeScript para processar arquivos XML de NF-e (Nota Fiscal Eletrônica) brasileira e convertê-los em um formato JSON estruturado. Este projeto extrai informações-chave, como detalhes da nota fiscal, emitente, destinatário, produtos e impostos, retornando-os em uma resposta JSON bem organizada.

## Funcionalidades

- **Processamento de XML**: Converte arquivos XML de NF-e em JSON usando a biblioteca `xml-js`.
- **Saída Estruturada**: Retorna um objeto JSON com detalhes da nota (chave de acesso, data de emissão, totais, etc.), emitente, destinatário e informações de produtos.
- **Segurança de Tipos**: Utiliza TypeScript com enums para tipos de documento (`CPF`/`CNPJ`), tipos de NF-e (`Entrada`/`Saída`) e modelos de NF-e (`55`/`65`).
- **Arquitetura Modular**: Organizado em controladores, serviços, tipos e utilitários para facilitar manutenção e escalabilidade.
- **Suporte a Upload de Arquivos**: Processa uploads de arquivos via `multipart/form-data` usando `@fastify/multipart`.
- **Tratamento de Erros**: Fornece mensagens de erro claras para entradas inválidas ou problemas no processamento de XML.

## Estrutura do Projeto

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

- **controllers/**: Gerencia requisições e respostas HTTP.
- **services/**: Contém a lógica de negócio para processar arquivos XML de NF-e.
- **types/**: Define interfaces e enums do TypeScript para a estrutura da resposta JSON.
- **utils/**: Funções utilitárias, como conversão de XML para JSON.
- **server.ts**: Configura o servidor Fastify e registra as rotas.
- **index.ts**: Ponto de entrada da aplicação.

## Instalação

1. Clone o repositório ou baixe o código-fonte:

   ```bash
   git clone https://github.com/SEU_USUARIO/nfe-parser.git
   cd nfe-parser
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Compile o código TypeScript:

   ```bash
   npm run build
   ```

## Executando a Aplicação

1. Inicie o servidor em modo de produção:

   ```bash
   npm start
   ```

2. Para desenvolvimento com recarga automática (usando `tsx`):

   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3000`.

## Uso da API

### Endpoint: Upload de XML de NF-e

- **Método**: `POST`
- **URL**: `/`
- **Content-Type**: `multipart/form-data`
- **Corpo**: Um único arquivo XML no formato NF-e.

**Exemplo de Requisição (curl)**:

```bash
curl -X POST http://localhost:3000 -F "file=@/caminho/para/sua/nfe.xml"
```

**Exemplo de Requisição (Postman)**:
- Crie uma nova requisição POST para `http://localhost:3000`.
- Na aba "Body", selecione `form-data`.
- Adicione uma chave chamada `file`, defina o tipo como `File` e faça upload de um arquivo XML de NF-e.

**Exemplo de Resposta**:

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

### Respostas de Erro

- **400 Bad Request (Arquivo não enviado)**:

  ```json
  {
    "error": "Nenhum arquivo foi enviado"
  }
  ```

- **400 Bad Request (XML inválido)**:

  ```json
  {
    "error": "Erro ao processar o arquivo XML",
    "details": "Formato XML inválido ou não reconhecido"
  }
  ```

## Desenvolvimento

- **Compilação TypeScript**: Compile o código TypeScript para JavaScript na pasta `dist/`:

  ```bash
  npm run build
  ```

- **Modo de Desenvolvimento**: Use `tsx` para recarga automática durante o desenvolvimento:

  ```bash
  npm run dev
  ```

- **Dependências**:
  - `fastify`: Framework web rápido e leve para Node.js.
  - `@fastify/multipart`: Plugin para upload de arquivos.
  - `xml-js`: Biblioteca para conversão de XML para JSON.
  - `typescript`: Para verificação de tipos e compilação.
  - `tsx`: Para recarga automática no desenvolvimento.
  - `@types/node`: Definições de tipos para Node.js.

## Testes

Para testar a API, use ferramentas como `curl`, Postman ou escreva testes automatizados. Recomenda-se um arquivo XML de NF-e de amostra para testes. Exemplo de teste com `curl`:

```bash
curl -X POST http://localhost:3000 -F "file=@/caminho/para/nfe-exemplo.xml"
```

Para testes automatizados, considere usar um framework como `Jest`:

1. Instale o Jest:

   ```bash
   npm install --save-dev jest @types/jest ts-jest
   ```

2. Configure o Jest no `package.json` ou em um arquivo `jest.config.js`.
3. Escreva testes na pasta `tests/`.

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade:

   ```bash
   git checkout -b feature/sua-funcionalidade
   ```

3. Faça suas alterações e commit:

   ```bash
   git commit -m "Adiciona sua funcionalidade"
   ```

4. Envie para a branch:

   ```bash
   git push origin feature/sua-funcionalidade
   ```

5. Abra um Pull Request no GitHub.

## Solução de Problemas

- **Erro: "Nenhum arquivo foi enviado"**: Verifique se o arquivo está corretamente anexado na requisição `multipart/form-data`.
- **Erro: "Formato XML inválido ou não reconhecido"**: Confirme que o arquivo enviado é um XML de NF-e válido conforme o padrão SEFAZ.
- **Conflito de Porta**: Se a porta `3000` estiver em uso, altere-a em `src/index.ts` ou encerre o processo conflitante:

  ```bash
  lsof -i :3000
  kill -9 <PID>
  ```

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE.txt) para detalhes.