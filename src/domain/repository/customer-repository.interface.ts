import type { Customer } from "../customer/entity/customer";
import type { RepositoryInterface } from "./repository-interface";

export interface CustomerRepositoryInterface
	extends RepositoryInterface<Customer> {}
