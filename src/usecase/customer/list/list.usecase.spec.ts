import { Address } from "@domain/customer/entity/value-object/address";
import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { CustomerListUseCase } from "./list.usecase";
import type { InputListCustomerDto } from "./list.dto";

const customerOne = CustomerFactory.createWithAddress(
	"John Doe",
	new Address("123 Main St", "1A", "10001", "New York", "NY"),
);

const customerTwo = CustomerFactory.createWithAddress(
	"Jane Doe",
	new Address("456 Main St", "2A", "10002", "Los Angeles", "CA"),
);

function MockRepository() {
	return {
		save: vi.fn(),
		findById: vi.fn(),
		findAll: vi.fn().mockResolvedValue([customerOne, customerTwo]),
		update: vi.fn(),
		delete: vi.fn(),
	};
}

describe("[Unit] Customer List UseCase", () => {
	const input: InputListCustomerDto = {} as InputListCustomerDto;

	it("should update a customer", async () => {
		const customerRepository = MockRepository();
		const customerListUseCase = new CustomerListUseCase(customerRepository);

		const output = await customerListUseCase.execute(input);

		expect(output.customers).toHaveLength(2);
		expect(output.total).toBe(2);
		[customerOne, customerTwo].forEach((customer, index) => {
			expect(output.customers[index]).toEqual({
				id: customer.id,
				name: customer.name,
				address: {
					street: customer.address.street,
					number: customer.address.number,
					zip: customer.address.zip,
					city: customer.address.city,
					state: customer.address.state,
				},
			});
		});
	});

});
