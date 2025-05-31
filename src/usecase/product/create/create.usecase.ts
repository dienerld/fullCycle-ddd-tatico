import type { ProductRepositoryInterface } from "@domain/product/repository/product-repository.interface";
import type {
	InputCreateProductDto,
	OutputCreateProductDto,
} from "./create.dto";
import { ProductFactory } from "@domain/product/factory/product.factory";

export class ProductCreateUseCase {
	constructor(private readonly productRepository: ProductRepositoryInterface) {}

	async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
		const product = ProductFactory.create(input.type, input.name, input.price);

		await this.productRepository.save(product);

		return {
			id: product.id,
			name: product.name,
			price: product.price,
		};
	}
}
