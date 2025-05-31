import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "@infrastructure/db/sequelize/model/customer.model";
import { CustomerRepository } from "@infrastructure/db/sequelize/repository/customer.repository";
import { CustomerUpdateUseCase } from "./update.usecase";
import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { Address } from "@domain/customer/entity/value-object/address";

describe("[Integration] Customer UpdateUseCase", () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});
		sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should update a customer", async () => {
		const repository = new CustomerRepository();
		const address = new Address("123 Main St", "New York", "NY", "10001", "1A");
		const customer = CustomerFactory.createWithAddress("John Doe", address);
		await repository.save(customer);

		const usecase = new CustomerUpdateUseCase(repository);
		const input = {
			id: customer.id,
			name: "Jane Doe",
			address: {
				street: "456 Elm St",
				number: "2B",
				zip: "20002",
				city: "Los Angeles",
				state: "CA",
			},
		};
		const output = await usecase.execute(input);

		expect(output).toStrictEqual({
			id: customer.id,
			name: "Jane Doe",
			address: input.address,
		});

		const customerDb = await CustomerModel.findOne({
			where: { id: customer.id },
		});
		expect(customerDb).not.toBeNull();
		expect(customerDb?.name).toBe("Jane Doe");
		expect(customerDb?.street).toBe("456 Elm St");
		expect(customerDb?.zip).toBe("20002");
		expect(customerDb?.city).toBe("Los Angeles");
		expect(customerDb?.state).toBe("CA");
	});

	it("should throw error if customer not found", async () => {
		const repository = new CustomerRepository();
		const usecase = new CustomerUpdateUseCase(repository);
		const input = {
			id: "not-exist",
			name: "Name",
			address: {
				street: "Any St",
				number: "0",
				zip: "00000",
				city: "Nowhere",
				state: "NA",
			},
		};
		await expect(usecase.execute(input)).rejects.toThrow("Customer not found");
	});

	it("should throw error if name is missing", async () => {
		const address = new Address("123 Main St", "New York", "NY", "10001", "1A");
		const customer = CustomerFactory.createWithAddress("John Doe", address);
		const repository = new CustomerRepository();

		await repository.save(customer);
		const usecase = new CustomerUpdateUseCase(repository);
		const input = {
			id: customer.id,
			name: "",
			address: {
				street: "123 Main St",
				number: "1A",
				zip: "10001",
				city: "New York",
				state: "NY",
			},
		};

		await expect(usecase.execute(input)).rejects.toThrow("Name is required");
		const customerDb = await CustomerModel.findOne({
			where: { id: customer.id },
		});

		expect(customerDb).not.toBeNull();
		expect(customerDb?.name).toBe("John Doe");
		expect(customerDb?.street).toBe("123 Main St");
		expect(customerDb?.zip).toBe("10001");
		expect(customerDb?.city).toBe("New York");
		expect(customerDb?.state).toBe("NY");
	});
});
