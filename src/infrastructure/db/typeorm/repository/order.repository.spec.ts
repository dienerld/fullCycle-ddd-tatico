import { Sequelize } from "sequelize-typescript";
import { OrderItemModel } from "../model/order-item.model";
import { OrderModel } from "../model/order.model";
import { CustomerModel } from "../model/customer.model";
import { ProductModel } from "../model/product.model";
import { Customer } from "@/domain/entity/customer";
import { Address } from "@/domain/entity/address";
import { Order } from "@/domain/entity/order";
import { OrderRepository } from "./order.repository";
import { OrderItem } from "@/domain/entity/order-item";
import { Product } from "@/domain/entity/product";

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
	});

	afterAll(async () => {
		await sequelize.close();
	});

	beforeEach(async () => {
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
	});

	afterEach(async () => {
		await OrderModel.destroy({ where: {} });
		await OrderItemModel.destroy({ where: {} });
		await CustomerModel.destroy({ where: {} });
		await ProductModel.destroy({ where: {} });
	});

	it("should create an order", async () => {
		const orderRepository = new OrderRepository();
		const customer = await CustomerModel.findByPk("1");
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

		const order = new Order("1", customer!.id, [item1]);
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
});
