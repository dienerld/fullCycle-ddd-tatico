import { Address } from "@domain/customer/entity/value-object/address";
import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { CustomerUpdateUseCase } from "./update.usecase";
import type { InputUpdateCustomerDto } from "./update.dto";

const customer = CustomerFactory.createWithAddress(
	"John Doe",
	new Address("123 Main St", "1A", "10001", "New York", "NY"),
);

function MockRepository() {
	return {
		save: vi.fn(),
		findById: vi.fn().mockResolvedValue(customer),
		findAll: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	};
}

describe("[Unit] Customer Update UseCase", () => {
	let input: InputUpdateCustomerDto = {} as InputUpdateCustomerDto;

	beforeEach(() => {
		input = {
			id: customer.id,
			name: "John Doe Updated",
			address: {
				street: "123 Main St Updated",
				number: "1A",
				zip: "10001",
				city: "New York",
				state: "NY",
			},
		};
	});

	it("should update a customer", async () => {
		const customerRepository = MockRepository();
		const customerUpdateUseCase = new CustomerUpdateUseCase(customerRepository);

		const output = await customerUpdateUseCase.execute(input);

		expect(output).toEqual({
			id: customer.id,
			name: input.name,
			address: {
				street: input.address.street,
				number: input.address.number,
				zip: input.address.zip,
				city: input.address.city,
				state: input.address.state,
			},
		});
	});

	it("should throw an error if customer not found", async () => {
		const customerRepository = MockRepository();
		customerRepository.findById = vi.fn().mockResolvedValue(null);
		const customerUpdateUseCase = new CustomerUpdateUseCase(customerRepository);

		await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
			"Customer not found",
		);
	});

	it("should throw an error if name is missing", async () => {
		const customerRepository = MockRepository();
		const customerUpdateUseCase = new CustomerUpdateUseCase(customerRepository);

		input.name = "";
		await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
			"Name is required",
		);
	});

	it("should throw an error if address.street is missing", async () => {
		const customerRepository = MockRepository();
		const customerUpdateUseCase = new CustomerUpdateUseCase(customerRepository);

		input.address.street = "";
		await expect(customerUpdateUseCase.execute(input)).rejects.toThrow(
			"Street is required",
		);
	});
});
