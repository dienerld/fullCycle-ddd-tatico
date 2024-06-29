import { Order } from "@/domain/entity/order";
import type { OrderRepositoryInterface } from "@/domain/repository/order-repository.interface";
import { OrderModel } from "../model/order.model";
import { OrderItem } from "@/domain/entity/order-item";
import { OrderItemModel } from "../model/order-item.model";

export class OrderRepository implements OrderRepositoryInterface {
	async findAll(): Promise<Order[]> {
		const orders = await OrderModel.findAll();
		return orders.map(
			(order) =>
				new Order(
					order.id,
					order.customerId,
					order.items.map(
						(item) =>
							new OrderItem(
								item.id,
								item.productId,
								item.quantity,
								item.name,
								item.price,
							),
					),
				),
		);
	}
	async findById(id: string): Promise<Order | null> {
		const order = await OrderModel.findByPk(id);
		if (!order) {
			return null;
		}
		return new Order(
			order.id,
			order.customerId,
			order.items.map(
				(item) =>
					new OrderItem(
						item.id,
						item.productId,
						item.quantity,
						item.name,
						item.price,
					),
			),
		);
	}
	async save(entity: Order): Promise<void> {
		await OrderModel.create(
			{
				id: entity.id,
				customerId: entity.customerId,
				total: entity.total(),
				items: entity.items.map((item) => ({
					id: item.id,
					productId: item.productId,
					orderId: entity.id,
					quantity: item.quantity,
					name: item.name,
					price: item.price,
				})),
			},
			{
				include: [{ model: OrderItemModel }],
			},
		);
	}
	update(entity: Order): Promise<void> {
		throw new Error("Method not implemented.");
	}
	delete(entity: Order): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
