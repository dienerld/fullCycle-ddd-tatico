import { Product } from "@/domain/entity/product";
import type { ProductRepositoryInterface } from "@/domain/repository/product-repository.interface";
import { ProductModel } from "../model/product.model";

export class ProductRepository implements ProductRepositoryInterface {
	async findAll(): Promise<Product[]> {
		const products = await ProductModel.findAll();
		return products.map(
			(product) => new Product(product.id, product.name, product.price),
		);
	}
	async findById(id: string): Promise<Product | null> {
		const product = await ProductModel.findOne({
			where: { id },
		});
		if (!product) {
			return null;
		}
		return new Product(product.id, product.name, product.price);
	}
	async save(entity: Product): Promise<void> {
		await ProductModel.create({
			id: entity.id,
			name: entity.name,
			price: entity.price,
		});
	}

	async update(entity: Product): Promise<void> {
		await ProductModel.update(
			{
				name: entity.name,
				price: entity.price,
			},
			{
				where: { id: entity.id },
			},
		);
	}

	delete(entity: Product): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
