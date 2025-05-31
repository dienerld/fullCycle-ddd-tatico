import { randomUUID } from "node:crypto";
import { Customer } from "../entity/customer";
import type { Address } from "../entity/value-object/address";



export class CustomerFactory {
	public static create(name: string): Customer {
		return new Customer(randomUUID(), name);
	}

	public static createWithAddress(
		name: string,
		address: Address,
	): Customer {
		const customer = new Customer(randomUUID(), name);
		// const addressValueObject = new Address(
		// 	address.street,
		// 	address.city,
		// 	address.state,
		// 	address.zip,
		// 	address.number,
		// );
		customer.changeAddress(address);
		return customer;
	}
}
