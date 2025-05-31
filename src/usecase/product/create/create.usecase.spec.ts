import { ProductCreateUseCase } from "./create.usecase";

function MockRepository() {
	return {
		save: vi.fn(),
		findById: vi.fn(),
		findAll: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	};
}

describe("[Unit] Product CreateUseCase", () => {
	it("should create a product of type a", async () => {
		const productRepository = MockRepository();
		const usecase = new ProductCreateUseCase(productRepository);

		const input = { type: "a", name: "Product A", price: 10 };
		const output = await usecase.execute(input);

		expect(output).toStrictEqual({
			id: expect.any(String),
			name: input.name,
			price: input.price,
		});
		expect(productRepository.save).toHaveBeenCalled();
	});

	it("should create a product of type b with double price", async () => {
		const productRepository = MockRepository();
		const usecase = new ProductCreateUseCase(productRepository);

		const input = { type: "b", name: "Product B", price: 10 };
		const output = await usecase.execute(input);

		expect(output).toStrictEqual({
			id: expect.any(String),
			name: input.name,
			price: 20,
		});
		expect(productRepository.save).toHaveBeenCalled();
	});

	it("should throw error for unsupported type", async () => {
		const productRepository = MockRepository();
		const usecase = new ProductCreateUseCase(productRepository);

		const input = { type: "c", name: "Product C", price: 10 };

		await expect(usecase.execute(input)).rejects.toThrow(
			"Product type not supported",
		);
	});
});
