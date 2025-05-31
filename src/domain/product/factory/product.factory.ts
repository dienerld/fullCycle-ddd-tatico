import { randomUUID } from "node:crypto";
import { Product } from "../entity/product";

export class ProductFactory {
	public static create(
		type: string,
		name: string,
		price: number,
	): Product {
		switch (type) {
			case "a":
				return new Product(randomUUID(), name, price);
			case "b":
				return new Product(randomUUID(), name, price * 2);
			default:
				throw new Error("Product type not supported");
		}
	}
}
