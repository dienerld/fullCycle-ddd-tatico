import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "@infrastructure/db/sequelize/model/customer.model";
import { CustomerRepository } from "@infrastructure/db/sequelize/repository/customer.repository";
import { CustomerListUseCase } from "./list.usecase";
import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { Address } from "@domain/customer/entity/value-object/address";

describe("[Integration] Customer ListUseCase", () => {
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

	it("should list all customers", async () => {
		const repository = new CustomerRepository();
		const address1 = new Address("Street 1", "City 1", "ST", "11111", "10");
		const address2 = new Address("Street 2", "City 2", "ST", "22222", "20");
		const customer1 = CustomerFactory.createWithAddress("Customer 1", address1);
		const customer2 = CustomerFactory.createWithAddress("Customer 2", address2);

		await Promise.all([repository.save(customer1), repository.save(customer2)]);

		const usecase = new CustomerListUseCase(repository);
		const output = await usecase.execute({});

		expect(output.customers).toHaveLength(2);
		expect(output.total).toBe(2);
		expect(output.customers).toStrictEqual([
			{
				id: customer1.id,
				name: customer1.name,
				address: {
					street: address1.street,
					number: address1.number,
					zip: address1.zip,
					city: address1.city,
					state: address1.state,
				},
			},
			{
				id: customer2.id,
				name: customer2.name,
				address: {
					street: address2.street,
					number: address2.number,
					zip: address2.zip,
					city: address2.city,
					state: address2.state,
				},
			},
		]);
	});

	it("should return empty array if there are no customers", async () => {
		const repository = new CustomerRepository();
		const usecase = new CustomerListUseCase(repository);
		const output = await usecase.execute({});
		expect(output.customers).toStrictEqual([]);
		expect(output.total).toBe(0);
	});
});
