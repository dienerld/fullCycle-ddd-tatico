import { Customer } from "@/domain/entity/customer";
import type { CustomerRepositoryInterface } from "@/domain/repository/customer-repository.interface";
import { CustomerModel } from "../model/customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
	async findAll(): Promise<Customer[]> {
		const customers = await CustomerModel.findAll();

		return customers.map(
			(customer) => new Customer(customer.id, customer.name),
		);
	}
	async findById(id: string): Promise<Customer | null> {
		const customer = await CustomerModel.findOne({
			where: { id },
		});
		if (!customer) {
			return null;
		}
		return new Customer(customer.id, customer.name);
	}

	async save(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: entity.address.street,
			state: entity.address.state,
			city: entity.address.city,
			zip: entity.address.zip,
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
