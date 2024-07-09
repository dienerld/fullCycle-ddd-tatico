import type { EventHandlerInterface } from "@/domain/shared/event/event-handler.interface";
import type { CustomerCreatedEvent } from "../customer-created.event";

export class LogTextWhenCustomerIsCreatedHandler
	implements EventHandlerInterface<CustomerCreatedEvent>
{
	handle(event: CustomerCreatedEvent): void {
		console.log("Esse é o primeiro console.log do evento: CustomerCreated");
	}
}
