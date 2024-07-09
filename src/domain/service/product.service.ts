import type { Product } from "@/domain/product/entity/product";

export class ProductService {
	static increasePrice(products: Product[], percentage: number) {
		for (const product of products) {
			product.changePrice(product.price + (product.price * percentage) / 100);
		}
	}
}
