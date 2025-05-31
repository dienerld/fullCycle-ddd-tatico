import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";

interface OrderItemProps {
	id: string;
	name: string;
	price: number;
	quantity: number;
	productId: string;
}

interface OrderFactoryProps {
	id: string;
	customerId: string;
	items: OrderItemProps[];
}
export class OrderFactory {
	public static create(orderProps: OrderFactoryProps): Order {
		const items = orderProps.items.map(
			(item) =>
				new OrderItem(
					item.id,
					item.name,
					item.price,
					item.productId,
					item.quantity,
				),
		);
		const order = new Order(orderProps.id, orderProps.customerId, items);
		return order;
	}
}
