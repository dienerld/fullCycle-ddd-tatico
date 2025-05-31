import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "@infrastructure/db/sequelize/model/product.model";
import { ProductRepository } from "@infrastructure/db/sequelize/repository/product.repository";
import { ProductUpdateUseCase } from "./update.usecase";
import { ProductFactory } from "@domain/product/factory/product.factory";

describe("[Integration] Product UpdateUseCase", () => {
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

	it("should update a product", async () => {
		const repository = new ProductRepository();
		const product = ProductFactory.create("a", "Product", 10);
		await repository.save(product);
		const usecase = new ProductUpdateUseCase(repository);

		const input = { id: product.id, name: "Updated Product", price: 20 };
		const output = await usecase.execute(input);

		expect(output).toStrictEqual({
			id: product.id,
			name: "Updated Product",
			price: 20,
		});

		const productDb = await ProductModel.findOne({ where: { id: product.id } });

		expect(productDb).not.toBeNull();
		expect(productDb?.name).toBe("Updated Product");
		expect(Number(productDb?.price)).toBe(20);
	});

	it("should throw error if product not found", async () => {
		const repository = new ProductRepository();
		const usecase = new ProductUpdateUseCase(repository);
		const input = { id: "not-exist", name: "Name", price: 10 };

		await expect(usecase.execute(input)).rejects.toThrow("Product not found");
	});
});
