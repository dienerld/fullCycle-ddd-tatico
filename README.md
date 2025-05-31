# DDD Modelagem Tática

Este projeto é um exemplo de aplicação dos conceitos de Domain-Driven Design (DDD) com modelagem tática, utilizando Node.js, TypeScript, Sequelize e testes automatizados realizado durante o curso de Clean Architecture da [FullCycle](https://fullcycle.com.br)

## Estrutura do Projeto

```
src/
  domain/         # Entidades, agregados, fábricas, serviços e repositórios de domínio
  usecase/        # Casos de uso (Application Layer)
    customer/     # Casos de uso para Customer (create, find, list, update)
    product/      # Casos de uso para Product (create, find, list, update)
  infrastructure/ # Implementações de infraestrutura (ORM, banco, repositórios)
    db/
      sequelize/
        model/        # Models do Sequelize
        repository/   # Repositórios Sequelize
```

## Principais Tecnologias

- Node.js
- TypeScript
- Sequelize + SQLite (para testes)
- Vitest (testes unitários e integração)
- Biome (formatação e lint)

## Scripts

- `yarn dev` — Roda a aplicação em modo desenvolvimento (se houver entrypoint)
- `yarn test` — Executa todos os testes com Vitest
- `yarn lint` — Formata o código com Biome

## Como rodar localmente

1. Instale as dependências:

   ```sh
   yarn install
   ```

2. Execute os testes:

   ```sh
   yarn test
   ```

## Exemplos de Uso

### Criando um Produto (UseCase)

```ts
import { ProductCreateUseCase } from "@/usecase/product/create/create.usecase";
import { ProductRepository } from "@/infrastructure/db/sequelize/repository/product.repository";

const repository = new ProductRepository();
const usecase = new ProductCreateUseCase(repository);

const input = { type: "a", name: "Product A", price: 10 };
const output = await usecase.execute(input);
console.log(output); // { id: '...', name: 'Product A', price: 10 }
```

### Teste de Integração (Vitest)

```ts
describe("[Integration] Product CreateUseCase", () => {
  it("should create a product", async () => {
    const repository = new ProductRepository();
    const usecase = new ProductCreateUseCase(repository);
    const input = { type: "a", name: "Product A", price: 10 };
    const output = await usecase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
```

## Testes

- Os testes cobrem casos de uso de criação, busca, listagem e atualização para Customer e Product.
- Testes de integração utilizam banco em memória (SQLite).

## Observações

- O projeto segue princípios de DDD, separando domínio, casos de uso e infraestrutura.
- Os repositórios de domínio são interfaces, implementadas na infraestrutura.
- O banco de dados usado nos testes é SQLite em memória, facilitando CI/CD.

---

Sinta-se à vontade para contribuir ou adaptar este projeto para seus estudos ou projetos reais!
