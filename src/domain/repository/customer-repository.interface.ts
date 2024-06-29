import type { Customer } from "../entity/customer";
import type { RepositoryInterface } from "./repository-interface";

export interface CustomerRepositoryInterface
	extends RepositoryInterface<Customer> {}
