import { Customer } from "@/domain/customer/entity/customer";
import { Order } from "../entity/order";
import { OrderService } from "./order.service";
import { OrderItem } from "../entity/order-item";

describe("Order Service", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "customer1");
    const item1 = new OrderItem("item1", "product1", 100, "p1", 1);
    const item2 = new OrderItem("item2", "product2", 200, "p2", 2);

    const order = OrderService.placeOrder(customer, [item1, item2]);

    expect(order.total()).toBe(500);
  });

  it("should get total of all orders", () => {
    const item1 = new OrderItem("item1", "product1", 100, "p1", 1);
    const item2 = new OrderItem("item2", "product2", 200, "p2", 2);

    const order = new Order("order1", "c1", [item1]);
    const order2 = new Order("order2", "c2", [item2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(500);
  });
});
