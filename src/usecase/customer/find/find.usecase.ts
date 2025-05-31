import type { CustomerRepositoryInterface } from "@domain/customer/repository/customer-repository.interface";
import type { InputFindCustomerDto, OutputFindCustomerDto } from "./find.dto";

export class FindCustomerUseCase {
	constructor(
		private readonly customerRepository: CustomerRepositoryInterface,
	) {}

	async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
		const customer = await this.customerRepository.findById(input.id);
		if (!customer) {
			throw new Error("Customer not found");
		}
		return {
			id: customer.id,
			name: customer.name,
			address: {
				street: customer.address.street,
				city: customer.address.city,
				zip: customer.address.zip,
				number: customer.address.number,
			},
		};
	}
}
