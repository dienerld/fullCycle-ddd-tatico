import type { Customer } from "@/domain/customer/entity/customer";
import type { EventInterface } from "@/domain/shared/event/event.interface";

export class CustomerCreatedEvent implements EventInterface {
	readonly dateTimeOccurred = new Date();
	constructor(readonly eventData: Customer) {}
}
