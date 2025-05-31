import { Customer } from "@domain/customer/entity/customer";
import { Address } from "@domain/customer/entity/value-object/address";
import { FindCustomerUseCase } from "./find.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", "City", "State", "Zip", "123A");
customer.changeAddress(address);

function MockRepository() {
	return {
		findById: vi.fn().mockReturnValue(Promise.resolve(customer)),
		findAll: vi.fn(),
		save: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	};
}

describe("[Unit] Customer Find UseCase", () => {
	it("should find a customer", async () => {
		const customerRepository = MockRepository();
		const usecase = new FindCustomerUseCase(customerRepository);

		const input = {
			id: "123",
		};

		const output = {
			id: "123",
			name: "John",
			address: {
				street: "Street",
				city: "City",
				zip: "Zip",
				number: "123A",
			},
		};

		const result = await usecase.execute(input);

		expect(result).toEqual(output);
	});

	it("should not find a customer", async () => {
		const customerRepository = MockRepository();
		customerRepository.findById.mockImplementation(() => {
			throw new Error("Customer not found");
		});
		const usecase = new FindCustomerUseCase(customerRepository);

		const input = {
			id: "123",
		};

		expect(() => {
			return usecase.execute(input);
		}).rejects.toThrow("Customer not found");
	});
});
