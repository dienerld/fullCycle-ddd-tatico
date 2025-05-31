import type { ProductRepositoryInterface } from "@domain/product/repository/product-repository.interface";
import type { InputFindProductDto, OutputFindProductDto } from "./find.dto";

export class ProductFindUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.findById(input.id);

    if (!product) throw new Error("Product not found");

    return {
      id: product.id,
      name: product.name,
      price: Number(product.price),
    };
  }
}
