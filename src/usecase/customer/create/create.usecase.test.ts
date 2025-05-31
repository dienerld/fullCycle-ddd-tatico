import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "@infrastructure/db/sequelize/model/customer.model";
import { CustomerRepository } from "@infrastructure/db/sequelize/repository/customer.repository";
import { CustomerCreateUseCase } from "./create.usecase";

describe("[Integration] Customer CreateUseCase", () => {
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

	it("should create a customer with number", async () => {
		const repository = new CustomerRepository();
		const usecase = new CustomerCreateUseCase(repository);

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
		const output = await usecase.execute(input);

		expect(output).toStrictEqual({
			id: expect.any(String),
			name: input.name,
			address: input.address,
		});
		const customerDb = await CustomerModel.findOne({
			where: { id: output.id },
		});

		expect(customerDb).not.toBeNull();
		expect(customerDb?.name).toBe(input.name);
		expect(customerDb?.street).toBe(input.address.street);
		expect(customerDb?.zip).toBe(input.address.zip);
		expect(customerDb?.city).toBe(input.address.city);
		expect(customerDb?.state).toBe(input.address.state);
	});

	it("should create a customer without number", async () => {
		const repository = new CustomerRepository();
		const usecase = new CustomerCreateUseCase(repository);

		const input = {
			name: "John Doe",
			address: {
				street: "123 Main St",
				zip: "10001",
				city: "New York",
				state: "NY",
			},
		};

		const output = await usecase.execute(input);

		expect(output).toStrictEqual({
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

		const customerDb = await CustomerModel.findOne({
			where: { id: output.id },
		});

		expect(customerDb).not.toBeNull();
	});

	it("should throw an error if name is missing", async () => {
		const repository = new CustomerRepository();
		const usecase = new CustomerCreateUseCase(repository);

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

		await expect(usecase.execute(input)).rejects.toThrow("Name is required");

		const customerDb = await CustomerModel.findAll();

		expect(customerDb).toHaveLength(0);
	});
});
