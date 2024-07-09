import type { Product } from "@/domain/product/entity/product";
import type { EventInterface } from "@/domain/shared/event/event.interface";

export class ProductCreatedEvent implements EventInterface {
	readonly dateTimeOccurred = new Date();
	constructor(readonly eventData: Product) {}
}
