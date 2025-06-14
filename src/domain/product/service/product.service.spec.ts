import { Product } from "@/domain/product/entity/product";
import { ProductService } from "./product.service";

describe("Product Service", () => {
	it("should change the prices fo all products", () => {
		const product1 = new Product("product1", "água", 100);
		const product2 = new Product("product2", "vinho", 200);
		const products = [product1, product2];

		ProductService.increasePrice(products, 100);

		expect(product1.price).toBe(200);
		expect(product2.price).toBe(400);
	});
});
