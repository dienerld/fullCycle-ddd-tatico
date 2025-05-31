import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "@infrastructure/db/sequelize/model/product.model";
import { ProductRepository } from "@infrastructure/db/sequelize/repository/product.repository";
import { ProductCreateUseCase } from "./create.usecase";

describe("[Integration] Product CreateUseCase", () => {
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

		const productDb = await ProductModel.findOne({ where: { id: output.id } });

		expect(productDb).not.toBeNull();
		expect(productDb?.name).toBe(input.name);
		expect(Number(productDb?.price)).toBe(input.price);
	});

	it("should throw an error if product type is not supported", async () => {
		const repository = new ProductRepository();
		const usecase = new ProductCreateUseCase(repository);

		const input = { type: "c", name: "Product C", price: 10 };
		await expect(usecase.execute(input)).rejects.toThrow(
			"Product type not supported",
		);
	});
});
