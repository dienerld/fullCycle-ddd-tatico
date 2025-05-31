import { CustomerCreateUseCase } from "./create.usecase";

const input = {
	name: "John Doe",
	address: {
		street: "123 Main St",
		number: "1A",
		zip: "10001",
		city: "New York",
	},
};

function MockRepository() {
	return {
		save: vi.fn(),
		findById: vi.fn(),
		findAll: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	};
}

describe("[Unit] Customer Create UseCase", () => {
	it("should create a customer with number", async () => {
		const customerRepository = MockRepository();
		const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);

		const input = {
			name: "John Doe",
			address: {
				street: "123 Main St",
				number: "1A",
				zip: "10001",
				city: "New York",
				state: "NY",
			},
		};

		const output = await customerCreateUseCase.execute(input);

		expect(output).toEqual({
			id: expect.any(String),
			name: input.name,
			address: input.address,
		});
	});

	it("should create a customer without number", async () => {
		const customerRepository = MockRepository();
		const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);

		const input = {
			name: "John Doe",
			address: {
				street: "123 Main St",
				zip: "10001",
				city: "New York",
				state: "NY",
			},
		};

		const output = await customerCreateUseCase.execute(input);

		expect(output).toEqual({
			id: expect.any(String),
			name: input.name,
			address: {
				street: input.address.street,
				number: "",
				zip: input.address.zip,
				city: input.address.city,
				state: input.address.state,
			},
		});
	});

	it("should throw an error if name is missing", async () => {
		const customerRepository = MockRepository();
		const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);

		const input = {
			name: "",
			address: {
				street: "123 Main St",
				number: "1A",
				zip: "10001",
				city: "New York",
				state: "NY",
			},
		};

		await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
			"Name is required",
		);
	});

	it("should throw an error if address.street is missing", async () => {
		const customerRepository = MockRepository();
		const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);

		const input = {
			name: "John Doe",
			address: {
				street: "",
				number: "1A",
				zip: "10001",
				city: "New York",
				state: "NY",
			},
		};

		await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
			"Street is required",
		);
	});
});
