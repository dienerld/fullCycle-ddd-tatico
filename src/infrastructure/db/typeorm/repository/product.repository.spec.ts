import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../model/product.model";
import { Product } from "@/domain/entity/product";
import { ProductRepository } from "./product.repository";

describe("[Unit] - Repository -> Product", () => {
	let sequelize: Sequelize;

	beforeAll(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	beforeEach(async () => {
		await ProductModel.destroy({ where: {} });
	});

	it("should create a product", async () => {
		const productRepository = new ProductRepository();
		const product = new Product("1", "Product 1", 10);

		await productRepository.save(product);

		const productFound = await ProductModel.findOne({
			where: { id: "1" },
		});

		expect(productFound).not.toBeNull();
		expect(productFound?.id).toBe("1");
	});

	it("should update a product", async () => {
		const productRepository = new ProductRepository();
		const product = new Product("1", "Product 1", 10);

		await productRepository.save(product);

		const productFound = await ProductModel.findOne({
			where: { id: "1" },
		});

		product.changeName("Product 2");
		product.changePrice(20);

		await productRepository.update(product);

		const productUpdated = await ProductModel.findOne({
			where: { id: "1" },
		});

		expect(productUpdated).not.toBeNull();
		expect(productUpdated?.toJSON()).toStrictEqual({
			id: "1",
			name: "Product 2",
			price: "20",
		});
	});

	it("should a find one product", async () => {
		const productRepository = new ProductRepository();
		const product = new Product("1", "Product 1", 10);

		await productRepository.save(product);

		const productFound = await productRepository.findById("1");
		const productModel = await ProductModel.findOne({
			where: { id: "1" },
		});

		expect(productFound).not.toBeNull();
		expect(productFound).toBeInstanceOf(Product);
		expect(productModel?.toJSON()).toStrictEqual({
			id: productFound?.id,
			name: productFound?.name,
			price: productFound?.price,
		});
	});

  it("should a find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 20);

    await productRepository.save(product1);
    await productRepository.save(product2);

    const productsFound = await productRepository.findAll();
    const productsModel = await ProductModel.findAll();

    expect(productsFound).toHaveLength(2);
    expect(productsFound[0]).toBeInstanceOf(Product);
    expect(productsFound[1]).toBeInstanceOf(Product);
    expect(productsModel).toHaveLength(2);
    expect(productsModel[0].toJSON()).toStrictEqual({
      id: productsFound[0].id,
      name: productsFound[0].name,
      price: productsFound[0].price,
    });
    expect(productsModel[1].toJSON()).toStrictEqual({
      id: productsFound[1].id,
      name: productsFound[1].name,
      price: productsFound[1].price,
    });
  });
});
