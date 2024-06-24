import type { Product } from "@/entity/product";

export class ProductService {
	static increasePrice(products: Product[], percentage: number) {
		for (const product of products) {
			product.changePrice(product.price + (product.price * percentage) / 100);
		}
	}
}
