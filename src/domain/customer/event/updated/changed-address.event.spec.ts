import { EventDispatcher } from "@/domain/shared/event/event-dispatcher";
import { LogUpdatedWhenChangeAddressHandler } from "./handler/log-updated-when-change-address.handler";
import { Customer } from "../../entity/customer";
import { Address } from "../../entity/address";
import { ChangedAddressEvent } from "./changed-address.event";

describe("ChangedAddressEvent", () => {
	it("should register an event handler", () => {
		const dispatcher = new EventDispatcher();
		const logHandler = new LogUpdatedWhenChangeAddressHandler();
		const eventType = "ChangedAddressEvent";

		dispatcher.register(eventType, logHandler);

		expect(dispatcher.getHandlers().get(eventType)).toBeDefined();
		expect(dispatcher.getHandlers().get(eventType)?.size).toBe(1);
	});

	it("should called handle method when an event is dispatched ", () => {
		const dispatcher = new EventDispatcher();
		const logHandler = new LogUpdatedWhenChangeAddressHandler();
		const eventType = "ChangedAddressEvent";

		const spyEventHandler = vi.spyOn(logHandler, "handle");

		dispatcher.register(eventType, logHandler);

		const customer = new Customer("id1", "Customer 1");
		const address = new Address("street", "city", "state", "zip");
    customer.setAddress(address);

    const changedAddressEvent = new ChangedAddressEvent(customer);

		dispatcher.notify(changedAddressEvent);

		expect(spyEventHandler).toHaveBeenCalled();
		expect(spyEventHandler).toHaveBeenCalledWith(changedAddressEvent);
	});
});
