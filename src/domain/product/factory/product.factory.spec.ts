import { i } from "vitest/dist/reporters-yx5ZTtEV";
import { ProductFactory } from "./product.factory";
import { Product } from "../entity/product";

describe("[Unit] Product Factory", () => {
	it("should create a product of type A", () => {
		const product = ProductFactory.create("a", "Product A", 100);
		expect(product).toBeInstanceOf(Product);
		expect(product.id).toBeDefined();
		expect(product.name).toBe("Product A");
		expect(product.price).toBe(100);
	});

	it("should create a product of type B", () => {
		const product = ProductFactory.create("b", "Product B", 200);
		expect(product).toBeInstanceOf(Product);
		expect(product.id).toBeDefined();
		expect(product.name).toBe("Product B");
		expect(product.price).toBe(400); // Price is doubled for type B
	});

	it("should throw an error for unsupported product type", () => {
		expect(() => {
			ProductFactory.create("c", "Product C", 300);
		}).toThrowError("Product type not supported");
	});
});
