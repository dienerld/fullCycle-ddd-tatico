import { randomUUID } from "node:crypto";
import type { Customer } from "@/domain/customer/entity/customer";
import { Order } from "@/domain/order/entity/order";
import type { OrderItem } from "@/domain/entity/order-item";

export class OrderService {
	static placeOrder(customer: Customer, items: OrderItem[]): Order {
		if (items.length === 0) {
			throw new Error("Order must have at least one item");
		}
		const order = new Order(randomUUID(), customer.id, items);
		customer.addRewardPoints(order.total() / 2);
		return order;
	}

	static total(orders: Order[]) {
		return orders.reduce((total, order) => total + order.total(), 0);
	}
}
