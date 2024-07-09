import type { EventHandlerInterface } from "@/domain/shared/event/event-handler.interface";
import type { ChangedAddressEvent } from "../changed-address.event";

export class LogUpdatedWhenChangeAddressHandler
	implements EventHandlerInterface<ChangedAddressEvent>
{
	handle(event: ChangedAddressEvent): void {
		const { address } = event.eventData;
		const stringAddress = `${address.street}, ${address.city}, ${address.state}, ${address.zip}`;
		console.log(
			`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${stringAddress}`,
		);
	}
}
