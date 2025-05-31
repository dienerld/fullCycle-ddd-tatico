import { Address } from "./value-object/address";
import { Customer } from "./customer";

describe("[Unit] - Customer", () => {
	it("should throw error when id is empty", () => {
		expect(() => new Customer("", "John")).toThrowError("Invalid id");
	});

	it("should throw error when name is empty", () => {
		expect(() => new Customer("1", "")).toThrowError("Name is required");
	});

	it("should throw error when change name is empty", () => {
		const customer = new Customer("1", "John");
		expect(() => customer.changeName("")).toThrowError("Name is required");
	});

	it("should change name", () => {
		const customer = new Customer("1", "John");
		customer.changeName("Doe");
		expect(customer.name).toBe("Doe");
	});

	it("should activate customer", () => {
		const customer = new Customer("1", "John");
		const address = new Address("street", "city", "state", "zip");
		customer.changeAddress(address);
		customer.activate();

		expect(customer.isActive()).toBeTruthy();
	});

	it("should add reward points", () => {
		const customer = new Customer("1", "John");
		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(100);
		expect(customer.rewardPoints).toBe(100);

		customer.addRewardPoints(100);
		expect(customer.rewardPoints).toBe(200);
	});

	it("should throw error when activate customer without address", () => {
		const customer = new Customer("1", "John");
		expect(() => customer.activate()).toThrowError(
			"Address is mandatory to activate customer",
		);
	});
});
