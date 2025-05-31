import type { RepositoryInterface } from "@domain/shared/repository/repository-interface";
import type { Customer } from "@domain/customer/entity/customer";
import { InputListCustomerDto, OutputListCustomerDto } from "@/usecase/customer/list/list.dto";

export interface CustomerRepositoryInterface
	extends RepositoryInterface<Customer> {
	}
