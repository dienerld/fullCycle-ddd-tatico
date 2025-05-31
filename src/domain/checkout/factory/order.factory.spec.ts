import { randomUUID } from "node:crypto";
import { OrderFactory } from "./order.factory";

describe("[Unit] Order Factory", () => {
	it("should create an order", () => {
		const orderProps = {
			id: randomUUID(),
			customerId: randomUUID(),
			items: [
				{
					id: randomUUID(),
					name: "Item 1",
					price: 100,
					quantity: 1,
					productId: randomUUID(),
				},
				{
					id: randomUUID(),
					name: "Item 2",
					price: 200,
					quantity: 2,
					productId: randomUUID(),
				},
			],
		};

		const order = OrderFactory.create(orderProps);

		expect(order.id).toBe(orderProps.id);
		expect(order.customerId).toBe(orderProps.customerId);
		expect(order.items).toHaveLength(2);
	});
});
