import type { ProductRepositoryInterface } from "@domain/product/repository/product-repository.interface";
import type { OutputListProductDto } from "./list.dto";
import type { Product } from "@domain/product/entity/product";

export class ProductListUseCase {
	constructor(private readonly productRepository: ProductRepositoryInterface) {}

	async execute(): Promise<OutputListProductDto> {
		const products = await this.productRepository.findAll();
		return OutputMapper.toOutput(products);
	}
}

class OutputMapper {
	static toOutput(products: Product[]): OutputListProductDto {
		return {
			products: products.map((product) => ({
				id: product.id,
				name: product.name,
				price: Number(product.price),
			})),
		};
	}
}
