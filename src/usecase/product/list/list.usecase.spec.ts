import { ProductFactory } from "@domain/product/factory/product.factory";
import { ProductListUseCase } from "./list.usecase";

describe("[Unit] Product ListUseCase", () => {
	function MockRepository() {
		return {
			findAll: vi.fn(),
			findById: vi.fn(),
			save: vi.fn(),
			update: vi.fn(),
			delete: vi.fn(),
		};
	}

	it("should list all products", async () => {
		const productRepository = MockRepository();
		const productOne = ProductFactory.create("b", "Product 1", 10);
		const productTwo = ProductFactory.create("b", "Product 2", 20);
		productRepository.findAll.mockResolvedValue([productOne, productTwo]);
		const usecase = new ProductListUseCase(productRepository);

		const output = await usecase.execute();

		expect(output).toStrictEqual({
			products: [
				{ id: productOne.id, name: productOne.name, price: productOne.price },
				{ id: productTwo.id, name: productTwo.name, price: productTwo.price },
			],
		});
	});

	it("should returns empty array if there are no products", async () => {
		const productRepository = MockRepository();
		productRepository.findAll.mockResolvedValue([]);
		const usecase = new ProductListUseCase(productRepository);

		const output = await usecase.execute();

		expect(output).toStrictEqual({
			products: [],
		});
	});
});
