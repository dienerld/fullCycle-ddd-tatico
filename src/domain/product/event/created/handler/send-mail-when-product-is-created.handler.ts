import type { EventHandlerInterface } from "@/domain/shared/event/event-handler.interface";
import type { ProductCreatedEvent } from "../product-created.event";

export class SendMailWhenProductIsCreatedHandler
	implements EventHandlerInterface<ProductCreatedEvent>
{
	handle(event: ProductCreatedEvent): void {
		console.log("Send email when product is created -> ", event.eventData.name);
	}
}
