import { Customer } from "@/domain/customer/entity/customer";
import { CustomerModel } from "../model/customer.model";
import type { CustomerRepositoryInterface } from "@domain/customer/repository/customer-repository.interface";
import { Address } from "@domain/customer/entity/value-object/address";

export class CustomerRepository implements CustomerRepositoryInterface {
	async findAll(): Promise<Customer[]> {
		const customers = await CustomerModel.findAll();

		return customers.map((customer) => CustomerMapper.toDomain(customer));
	}

	async findById(id: string): Promise<Customer | null> {
		const customer = await CustomerModel.findOne({
			where: { id },
		});
		if (!customer) {
			return null;
		}
		return CustomerMapper.toDomain(customer);
	}

	async save(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: entity.address.street,
			state: entity.address.state,
			city: entity.address.city,
			zip: entity.address.zip,
			number: entity.address.number,
			active: entity.isActive(),
			rewardPoints: entity.rewardPoints,
		});
	}

	async update(entity: Customer): Promise<void> {
		await CustomerModel.update(
			{
				name: entity.name,
				street: entity.address.street,
				state: entity.address.state,
				city: entity.address.city,
				zip: entity.address.zip,
				number: entity.address.number,
				active: entity.isActive(),
				rewardPoints: entity.rewardPoints,
			},
			{
				where: { id: entity.id },
			},
		);
	}
	async delete(entity: Customer): Promise<void> {
		await CustomerModel.destroy({
			where: { id: entity.id },
		});
	}
}

class CustomerMapper {
	static toDomain(customerModel: CustomerModel): Customer {
		const customer = new Customer(customerModel.id, customerModel.name);
		const address = new Address(
			customerModel.street,
			customerModel.city,
			customerModel.state,
			customerModel.zip,
			customerModel.number ?? "",
		);
		customer.changeAddress(address);
		return customer;
	}
}
