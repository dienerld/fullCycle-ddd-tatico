import type { EventHandlerInterface } from "@/domain/shared/event/event-handler.interface";
import type { CustomerCreatedEvent } from "../customer-created.event";

export class SecondLogTextWhenCustomerIsCreatedHandler
	implements EventHandlerInterface<CustomerCreatedEvent>
{
	handle(event: CustomerCreatedEvent): void {
		console.log("Esse é o segundo console.log do evento: CustomerCreated");
	}
}
