import { Product } from "@/domain/product/entity/product";
import { EventDispatcher } from "@/domain/shared/event/event-dispatcher";
import { ProductCreatedEvent } from "./product-created.event";
import { SendMailWhenProductIsCreatedHandler } from "./handler/send-mail-when-product-is-created.handler";

describe("Domain Event", () => {
	it("should register an event handler", () => {
		const dispatcher = new EventDispatcher();
		const handler = new SendMailWhenProductIsCreatedHandler();
		const eventType = ProductCreatedEvent.name;

		dispatcher.register(eventType, handler);

		expect(dispatcher.getHandlers().get(eventType)).toBeDefined();
		expect(dispatcher.getHandlers().get(eventType)?.size).toBe(1);
		expect(dispatcher.getHandlers().get(eventType)?.has(handler)).toBeTruthy();
	});

	it("should called handle method when an event is dispatched", () => {
		const dispatcher = new EventDispatcher();
		const handler = new SendMailWhenProductIsCreatedHandler();
		const eventType = ProductCreatedEvent.name;
		const product = new Product("id1", "Product 1", 1000);
		const productCreatedEvent = new ProductCreatedEvent(product);
		const spyEventHandler = vi.spyOn(handler, "handle");

		dispatcher.register(eventType, handler);
		dispatcher.notify(productCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
		expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent);
	});
});
