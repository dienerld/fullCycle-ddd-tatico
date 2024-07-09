import type { Product } from "../product/entity/product";
import type { RepositoryInterface } from "./repository-interface";

export interface ProductRepositoryInterface
	extends RepositoryInterface<Product> {}
