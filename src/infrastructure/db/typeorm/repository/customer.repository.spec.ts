import { Address } from "@/domain/customer/entity/value-object/address";
import { CustomerModel } from "../model/customer.model";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "@/domain/customer/entity/customer";
import { Sequelize } from "sequelize-typescript";

describe("[Unit] - Repository -> Customer", () => {
	let sequelize: Sequelize;

	beforeAll(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	beforeEach(async () => {
		await CustomerModel.destroy({ where: {} });
	});

	it("should create a customer", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("1", "Customer 1");
		customer.setAddress(new Address("Street 1", "City 1", "State 1", "Zip 1"));

		await customerRepository.save(customer);

		const customerFound = await CustomerModel.findOne({
			where: { id: "1" },
		});

		expect(customerFound).not.toBeNull();
		expect(customerFound?.id).toBe("1");
	});

	it("should find all customers", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("1", "Customer 1");
		customer.setAddress(new Address("Street 1", "City 1", "State 1", "Zip 1"));

		await customerRepository.save(customer);

		const customers = await customerRepository.findAll();

		expect(customers).toHaveLength(1);
		expect(customers[0].id).toBe("1");
	});

	it("should find a customer by id", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("1", "Customer 1");
		customer.setAddress(new Address("Street 1", "City 1", "State 1", "Zip 1"));

		await customerRepository.save(customer);

		const customerFound = await customerRepository.findById("1");

		expect(customerFound).not.toBeNull();
		expect(customerFound?.id).toBe("1");
	});

	it("should return null when customer is not found", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("1", "Customer 1");
		customer.setAddress(new Address("Street 1", "City 1", "State 1", "Zip 1"));

		await customerRepository.save(customer);

		const customerFound = await customerRepository.findById("2");

		expect(customerFound).toBeNull();
	});

	it("should update a customer", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("1", "Customer 1");
		customer.setAddress(new Address("Street 1", "City 1", "State 1", "Zip 1"));

		await customerRepository.save(customer);

		const customerFound = await CustomerModel.findOne({
			where: { id: "1" },
		});

		customer.changeName("Customer 2");
		customer.setAddress(new Address("Street 2", "City 2", "State 2", "Zip 2"));

		await customerRepository.update(customer);

		const customerUpdated = await CustomerModel.findOne({
			where: { id: "1" },
		});

		expect(customerUpdated).not.toBeNull();
		expect(customerUpdated?.toJSON()).toStrictEqual({
			id: "1",
			name: "Customer 2",
			street: "Street 2",
			state: "State 2",
			city: "City 2",
			zip: "Zip 2",
			active: false,
			rewardPoints: 0,
		});
	});

	it("should delete a customer", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("1", "Customer");
		customer.setAddress(new Address("Street", "City", "State", "Zip"));

		await customerRepository.save(customer);

		await customerRepository.delete(customer);

		const customerFound = await CustomerModel.findOne({
			where: { id: "1" },
		});

		expect(customerFound).toBeNull();

		const customers = await CustomerModel.findAll();

		expect(customers).toHaveLength(0);
	});
});
