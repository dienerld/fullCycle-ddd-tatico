import type { CustomerRepositoryInterface } from "@domain/customer/repository/customer-repository.interface";
import type {
	InputUpdateCustomerDto,
	OutputUpdateCustomerDto,
} from "./update.dto";
import { Address } from "@domain/customer/entity/value-object/address";

export class CustomerUpdateUseCase {
	constructor(
		private readonly customerRepository: CustomerRepositoryInterface,
	) {}

	async execute(
		input: InputUpdateCustomerDto,
	): Promise<OutputUpdateCustomerDto> {
		const customer = await this.customerRepository.findById(input.id);
		if (!customer) {
			throw new Error("Customer not found");
		}

		customer.changeName(input.name);
		customer.changeAddress(
			new Address(
				input.address.street,
				input.address.city,
				input.address.state,
				input.address.zip,
				input.address.number,
			),
		);

		await this.customerRepository.update(customer);
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
