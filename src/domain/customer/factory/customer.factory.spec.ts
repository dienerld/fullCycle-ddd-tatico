import { Address } from "../entity/value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("[Unit] Customer Factory", () => {
	it("should create a customer", () => {
		const customer = CustomerFactory.create("John Doe");

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");
		expect(customer.address).toBeUndefined();
	});

	it("should create a customer with an address", () => {
		const address = new Address("123 Main St", "NY", "New York", "10001");
		const customer = CustomerFactory.createWithAddress("John Doe", address);

		expect(customer.id).toBeDefined();
		expect(customer.name).toBe("John Doe");
		expect(customer.address).toBe(address);
	});
});
