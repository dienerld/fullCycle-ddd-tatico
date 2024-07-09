import { Order } from "@/domain/order/entity/order";
import type { OrderRepositoryInterface } from "@/domain/repository/order-repository.interface";
import { OrderModel } from "../model/order.model";
import { OrderItemModel } from "../model/order-item.model";
import { OrderItem } from "@/domain/order/entity/order-item";

export class OrderRepository implements OrderRepositoryInterface {
	async findAll(): Promise<Order[]> {
		const orders = await OrderModel.findAll({ include: [OrderItemModel] });
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
		const order = await OrderModel.findByPk(id, { include: [OrderItemModel] });
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
						item.name,
						item.price,
						item.productId,
						item.quantity,
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
	async update(entity: Order): Promise<void> {
		await OrderModel.update(
			{
				total: entity.total(),
			},
			{ where: { id: entity.id } },
		);
		await OrderItemModel.destroy({ where: { orderId: entity.id } });
		await OrderItemModel.bulkCreate(
			entity.items.map((item) => ({
				id: item.id,
				productId: item.productId,
				orderId: entity.id,
				quantity: item.quantity,
				name: item.name,
				price: item.price,
			})),
		);
	}
	async delete(entity: Order): Promise<void> {
		await OrderModel.destroy({ where: { id: entity.id }, cascade: true });
	}
}
