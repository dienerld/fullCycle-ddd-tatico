import { Product } from "@domain/product/entity/product";
import { ProductFindUseCase } from "./find.usecase";
import { ProductFactory } from "@domain/product/factory/product.factory";

function MockRepository() {
	return {
		findById: vi.fn(),
		findAll: vi.fn(),
		save: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	};
}

describe("[Unit] Product FindUseCase", () => {
	it("should find a product", async () => {
		const productRepository = MockRepository();
		const product = ProductFactory.create("a", "Product", 10);
		productRepository.findById.mockResolvedValue(product);
		const usecase = new ProductFindUseCase(productRepository);

		const input = { id: product.id };
		const output = await usecase.execute(input);

		expect(output).toEqual({
			id: product.id,
			name: product.name,
			price: product.price,
		});
	});

	it("should throw error if product not found", async () => {
		const productRepository = MockRepository();
		productRepository.findById.mockResolvedValue(null);
		const usecase = new ProductFindUseCase(productRepository);

		const input = { id: "2" };

		await expect(usecase.execute(input)).rejects.toThrow("Product not found");
	});
});
