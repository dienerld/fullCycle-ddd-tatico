import { Sequelize } from "sequelize-typescript";
import { Address } from "@/domain/customer/entity/value-object/address";
import { Customer } from "@/domain/customer/entity/customer";
import { Product } from "@/domain/product/entity/product";
import { CustomerModel } from "../model/customer.model";
import { OrderItemModel } from "../model/order-item.model";
import { OrderModel } from "../model/order.model";
import { ProductModel } from "../model/product.model";
import { OrderRepository } from "./order.repository";
import { OrderItem } from "@/domain/checkout/entity/order-item";
import { Order } from "@/domain/checkout/entity/order";


describe("[Unit] - Repository -> Order", () => {
	let sequelize: Sequelize;
	let customerModel: CustomerModel;

	beforeAll(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([
			OrderModel,
			OrderItemModel,
			CustomerModel,
			ProductModel,
		]);
		await sequelize.sync();

		const customer = new Customer("1", "Customer 1");
		const address = new Address("Street 1", "City 1", "State 1", "Zip 1");
		customer.setAddress(address);

		await CustomerModel.create({
			id: customer.id,
			name: customer.name,
			street: address.street,
			city: address.city,
			state: address.state,
			zip: address.zip,
			rewardPoints: 0,
			active: true,
		});
		const searched = await CustomerModel.findByPk(customer.id);
		if (!searched) {
			throw new Error("Customer not found");
		}
		customerModel = searched;
	});

	afterAll(async () => {
		await CustomerModel.destroy({ where: {} });
		await sequelize.close();
	});

	afterEach(async () => {
		await OrderModel.destroy({ where: {} });
		await OrderItemModel.destroy({ where: {} });
		await ProductModel.destroy({ where: {} });
	});

	it("should create an order", async () => {
		const orderRepository = new OrderRepository();
		const product = new Product("1", "Product 1", 10);

		await ProductModel.create({
			id: product.id,
			name: product.name,
			price: product.price,
		});

		const item1 = new OrderItem(
			"1",
			product.name,
			product.price,
			product.id,
			2,
		);

		const order = new Order("1", customerModel.id, [item1]);
		await orderRepository.save(order);

		const orderFound = await OrderModel.findOne({
			where: { id: order.id },
			include: OrderItemModel,
		});

		expect(orderFound?.toJSON()).toStrictEqual({
			id: "1",
			customerId: "1",
			total: order.total(),
			items: [
				{
					id: item1.id,
					orderId: order.id,
					productId: item1.productId,
					quantity: item1.quantity,
					name: item1.name,
					price: item1.price,
				},
			],
		});
	});

	it("should find all orders", async () => {
		const orderRepository = new OrderRepository();
		const product1 = new Product("1", "Product 1", 10);
		const product2 = new Product("2", "Product 2", 20);

		await ProductModel.create({
			id: product1.id,
			name: product1.name,
			price: product1.price,
		});

		await ProductModel.create({
			id: product2.id,
			name: product2.name,
			price: product2.price,
		});

		const item1 = new OrderItem(
			"1",
			product1.name,
			product1.price,
			product1.id,
			2,
		);
		const order1 = new Order("1", customerModel.id, [item1]);
		await orderRepository.save(order1);

		const orders = await orderRepository.findAll();

		expect(orders).toHaveLength(1);

		const item2 = new OrderItem(
			"2",
			product2.name,
			product2.price,
			product2.id,
			3,
		);
		const order2 = new Order("2", customerModel.id, [item2]);
		await orderRepository.save(order2);

		const orders2 = await orderRepository.findAll();

		expect(orders2).toHaveLength(2);
		expect(orders2.map((order) => order.id)).toStrictEqual([
			order1.id,
			order2.id,
		]);

		const item3 = new OrderItem(
			"3",
			product1.name,
			product1.price,
			product1.id,
			1,
		);
		const item4 = new OrderItem(
			"4",
			product2.name,
			product2.price,
			product2.id,
			1,
		);

		const order3 = new Order("3", customerModel.id, [item3, item4]);
		await orderRepository.save(order3);

		const orders3 = await orderRepository.findAll();

		expect(orders3).toHaveLength(3);

		const items = orders3.map((order) => order.items.length);

		expect(items).toStrictEqual([
			order1.items.length,
			order2.items.length,
			order3.items.length,
		]);
	});

	it("should find an order by id", async () => {
		const orderRepository = new OrderRepository();
		const product = new Product("1", "Product 1", 10);

		await ProductModel.create({
			id: product.id,
			name: product.name,
			price: product.price,
		});

		const item = new OrderItem("1", product.name, product.price, product.id, 2);
		const order = new Order("1", customerModel.id, [item]);
		await orderRepository.save(order);

		const orderFound = await orderRepository.findById(order.id);

		expect(orderFound).toStrictEqual(order);
	});

	it("should update an order", async () => {
		const orderRepository = new OrderRepository();
		const product1 = new Product("1", "Product 1", 10);
		const product2 = new Product("2", "Product 2", 20);

		await ProductModel.create({
			id: product1.id,
			name: product1.name,
			price: product1.price,
		});

		await ProductModel.create({
			id: product2.id,
			name: product2.name,
			price: product2.price,
		});

		const item1 = new OrderItem(
			"1",
			product1.name,
			product1.price,
			product1.id,
			2,
		);
		const order = new Order("1", customerModel.id, [item1]);
		const item2 = new OrderItem(
			"2",
			product2.name,
			product2.price,
			product2.id,
			3,
		);
		await orderRepository.save(order);

		order.addItem(item2);

		await orderRepository.update(order);

		const orderFound = await OrderModel.findOne({
			where: { id: order.id },
			include: OrderItemModel,
		});

		expect(orderFound?.toJSON()).toStrictEqual({
			id: "1",
			customerId: customerModel.id,
			total: order.total(),
			items: [
				{
					id: item1.id,
					orderId: order.id,
					productId: item1.productId,
					quantity: item1.quantity,
					name: item1.name,
					price: item1.price,
				},
				{
					id: item2.id,
					orderId: order.id,
					productId: item2.productId,
					quantity: item2.quantity,
					name: item2.name,
					price: item2.price,
				},
			],
		});
	});

	it("should delete an order", async () => {
		const orderRepository = new OrderRepository();
		const product = new Product("1", "Product 1", 10);

		await ProductModel.create({
			id: product.id,
			name: product.name,
			price: product.price,
		});

		const item = new OrderItem("1", product.name, product.price, product.id, 2);
		const order = new Order("1", customerModel.id, [item]);
		await orderRepository.save(order);

		await orderRepository.delete(order);

		const orderFound = await OrderModel.findByPk(order.id);
		const itemsFound = await OrderItemModel.findAll({
			where: { orderId: order.id },
		});

		expect(orderFound).toBeNull();
		expect(itemsFound).toHaveLength(0);
	});
});
