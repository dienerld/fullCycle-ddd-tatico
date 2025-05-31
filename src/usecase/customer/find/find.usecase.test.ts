import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "@infrastructure/db/sequelize/model/customer.model";
import { CustomerRepository } from "@infrastructure/db/sequelize/repository/customer.repository";
import { FindCustomerUseCase } from "./find.usecase";
import { CustomerFactory } from "@domain/customer/factory/customer.factory";
import { Address } from "@domain/customer/entity/value-object/address";

describe("[Integration] Customer FindUseCase", () => {
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

	it("should find a customer", async () => {
		const repository = new CustomerRepository();
		const address = new Address(
			"123 Main St",
			"New York",
			"NY",
			"10001",
			"1A"
		);
		const customer = CustomerFactory.createWithAddress("John Doe", address);
		await repository.save(customer);
		const usecase = new FindCustomerUseCase(repository);

		const input = { id: customer.id };
		const output = await usecase.execute(input);


		expect(output).toStrictEqual({
			id: customer.id,
			name: customer.name,
			address: {
				street: customer.address.street,
				number: customer.address.number,
				zip: customer.address.zip,
				city: customer.address.city,
			},
		});
	});

	it("should throw error if customer not found", async () => {
		const repository = new CustomerRepository();
		const usecase = new FindCustomerUseCase(repository);
		const input = { id: "not-exist" };
		await expect(usecase.execute(input)).rejects.toThrow("Customer not found");
	});
});
