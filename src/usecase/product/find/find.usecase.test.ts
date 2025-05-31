import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "@infrastructure/db/sequelize/model/product.model";
import { ProductRepository } from "@infrastructure/db/sequelize/repository/product.repository";
import { ProductFindUseCase } from "./find.usecase";
import { ProductFactory } from "@domain/product/factory/product.factory";

describe("[Integration] Product FindUseCase", () => {
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

	it("should find a product", async () => {
		const repository = new ProductRepository();
		const product = ProductFactory.create("a", "Product", 10);
		await repository.save(product);
		const usecase = new ProductFindUseCase(repository);

		const input = { id: product.id };

		const output = await usecase.execute(input);

		expect(output).toStrictEqual({
			id: product.id,
			name: product.name,
			price: product.price,
		});
	});

	it("should throw error if product not found", async () => {
		const repository = new ProductRepository();
		const usecase = new ProductFindUseCase(repository);

		const input = { id: "not-exist" };

		await expect(usecase.execute(input)).rejects.toThrow("Product not found");
	});
});
