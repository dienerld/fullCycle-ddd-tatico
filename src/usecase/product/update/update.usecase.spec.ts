import { ProductFactory } from "@domain/product/factory/product.factory";
import { ProductUpdateUseCase } from "./update.usecase";

describe("[Unit] Product UpdateUseCase", () => {
	function MockRepository() {
		return {
			findById: vi.fn(),
			update: vi.fn(),
			findAll: vi.fn(),
			save: vi.fn(),
			delete: vi.fn(),
		};
	}

	it("should update a product", async () => {
		const product = ProductFactory.create("a", "Old Name", 10);
		const productRepository = MockRepository();
		productRepository.findById.mockResolvedValue(product);
		const usecase = new ProductUpdateUseCase(productRepository);

		const input = { id: product.id, name: "New Name", price: 20 };

		const output = await usecase.execute(input);

		expect(productRepository.update).toHaveBeenCalledWith(product);
		expect(output).toStrictEqual({
			id: product.id,
			name: "New Name",
			price: 20,
		});
	});

	it("should throw error if product not found", async () => {
		const productRepository = MockRepository();
		productRepository.findById.mockResolvedValue(null);
		const usecase = new ProductUpdateUseCase(productRepository);

		const input = { id: "2", name: "Name", price: 10 };

    await expect(usecase.execute(input)).rejects.toThrow("Product not found");
	});
});
