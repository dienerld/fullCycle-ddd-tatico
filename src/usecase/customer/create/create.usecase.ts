import type { CustomerRepositoryInterface } from "@domain/customer/repository/customer-repository.interface";
import type {
	InputCreateCustomerDto,
	OutputCreateCustomerDto,
} from "./create.dto";
import { Address } from "@domain/customer/entity/value-object/address";
import { randomUUID } from "node:crypto";
import { Customer } from "@domain/customer/entity/customer";
import { CustomerFactory } from "@domain/customer/factory/customer.factory";

export class CustomerCreateUseCase {
	constructor(
		private readonly customerRepository: CustomerRepositoryInterface,
	) {}

	async execute(
		input: InputCreateCustomerDto,
	): Promise<OutputCreateCustomerDto> {
		const address = new Address(
			input.address.street,
			input.address.city,
			input.address.state,
			input.address.zip,
			input.address.number,
		);
		const customer = CustomerFactory.createWithAddress(input.name, address);

		await this.customerRepository.save(customer);
		return {
			id: customer.id,
			name: customer.name,
			address: {
				street: customer.address.street,
				number: customer.address.number,
				zip: customer.address.zip,
				city: customer.address.city,
				state: customer.address.state,
      },
		};
	}
}
