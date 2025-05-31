import type { Product } from "@domain/product/entity/product";
import type { RepositoryInterface } from "@domain/shared/repository/repository-interface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
