import { EventDispatcher } from "@/domain/shared/event/event-dispatcher";
import { LogTextWhenCustomerIsCreatedHandler } from "./handler/log-text-when-customer-is-created.handler";
import { SecondLogTextWhenCustomerIsCreatedHandler } from "./handler/second-log-text-when-customer-is-created.handler";
import { Customer } from "../../entity/customer";
import { CustomerCreatedEvent } from "./customer-created.event";

describe("CustomerCreatedEvent", () => {
	it("should register an event handler", () => {
		const dispatcher = new EventDispatcher();
		const firstHandler = new LogTextWhenCustomerIsCreatedHandler();
		const secondHandler = new SecondLogTextWhenCustomerIsCreatedHandler();
		const eventType = "CustomerCreatedEvent";

		dispatcher.register(eventType, firstHandler);
		dispatcher.register(eventType, secondHandler);

		expect(dispatcher.getHandlers().get(eventType)).toBeDefined();
		expect(dispatcher.getHandlers().get(eventType)?.size).toBe(2);
	});

	it("should called handle method when an event is dispatched", () => {
		const dispatcher = new EventDispatcher();
		const firstHandler = new LogTextWhenCustomerIsCreatedHandler();
		const secondHandler = new SecondLogTextWhenCustomerIsCreatedHandler();
		const eventType = CustomerCreatedEvent.name;

		const spyEventHandler = vi.spyOn(firstHandler, "handle");
		const spySecondEventHandler = vi.spyOn(secondHandler, "handle");

		dispatcher.register(eventType, firstHandler);
		dispatcher.register(eventType, secondHandler);

		const customer = new Customer("id1", "Customer 1");
		const customerCreatedEvent = new CustomerCreatedEvent(customer);

		dispatcher.notify(customerCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
		expect(spyEventHandler).toHaveBeenCalledWith(customerCreatedEvent);
		expect(spySecondEventHandler).toHaveBeenCalled();
		expect(spySecondEventHandler).toHaveBeenCalledWith(customerCreatedEvent);
	});
});
