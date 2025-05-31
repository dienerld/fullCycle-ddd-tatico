import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "@infrastructure/db/sequelize/model/product.model";
import { ProductRepository } from "@infrastructure/db/sequelize/repository/product.repository";
import { ProductListUseCase } from "./list.usecase";
import { ProductFactory } from "@domain/product/factory/product.factory";

describe("[Integration] Product ListUseCase", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should list all products", async () => {
		const repository = new ProductRepository();
		const product1 = ProductFactory.create("a", "Product 1", 10);
		const product2 = ProductFactory.create("a", "Product 2", 20);

		await Promise.all([repository.save(product1), repository.save(product2)]);

		const usecase = new ProductListUseCase(repository);
		const output = await usecase.execute();

		expect(output.products).toStrictEqual([
			{ id: product1.id, name: product1.name, price: product1.price },
			{ id: product2.id, name: product2.name, price: product2.price },
		]);
	});
});
