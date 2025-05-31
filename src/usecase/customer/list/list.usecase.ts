import type { CustomerRepositoryInterface } from "@domain/customer/repository/customer-repository.interface";
import type { InputListCustomerDto, OutputListCustomerDto } from "./list.dto";
import type { Customer } from "@domain/customer/entity/customer";

export class CustomerListUseCase {
	constructor(
		private readonly customerRepository: CustomerRepositoryInterface,
	) {}

	async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
		const customers = await this.customerRepository.findAll();

		return OutputMapper.toOutput(customers);
	}
}

class OutputMapper {
	static toOutput(customers: Customer[]): OutputListCustomerDto {
		return {
			customers: customers.map((customer) => ({
				id: customer.id,
				name: customer.name,
				address: {
					street: customer.address.street,
					zip: customer.address.zip,
					city: customer.address.city,
					state: customer.address.state,
					number: customer.address.number,
				},
			})),
			total: customers.length,
		};
	}
}
