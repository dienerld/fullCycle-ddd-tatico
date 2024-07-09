import { EventDispatcher } from "./event-dispatcher";
import type { EventInterface } from "./event.interface";
import type { EventHandlerInterface } from "./event-handler.interface";

class AnyEvent implements EventInterface {
	readonly dateTimeOccurred = new Date();
	constructor(readonly eventData: { id: string; name: string }) {}
}

class AnyEventHandler implements EventHandlerInterface<AnyEvent> {
	handle(event: AnyEvent): void {
		console.log("Any event handler -> ", event.eventData.name);
	}
}

describe("Domain Event", () => {
	it("should register an event handler", () => {
		const dispatcher = new EventDispatcher();
		const handler = new AnyEventHandler();
		const eventType = AnyEvent.name;

		dispatcher.register(eventType, handler);

		expect(dispatcher.getHandlers().get(eventType)).toBeDefined();
		expect(dispatcher.getHandlers().get(eventType)?.size).toBe(1);
		expect(dispatcher.getHandlers().get(eventType)?.has(handler)).toBeTruthy();
	});

	it("should unregister an event handler", () => {
		const dispatcher = new EventDispatcher();
		const handler = new AnyEventHandler();
		const eventType = AnyEvent.name;

		dispatcher.register(eventType, handler);
		expect(dispatcher.getHandlers().get(eventType)?.has(handler)).toBeTruthy();

		dispatcher.unregister(eventType, handler);

		expect(dispatcher.getHandlers().get(eventType)).toBeDefined();
		expect(dispatcher.getHandlers().get(eventType)?.size).toBe(0);
	});

	it("should notify all handlers when an event is dispatched", () => {
		const dispatcher = new EventDispatcher();
		const handler = new AnyEventHandler();
		const eventType = AnyEvent.name;
		const productCreatedEvent = new AnyEvent({
			id: "any_id",
			name: "Any name",
		});
		const spyEventHandler = vi.spyOn(handler, "handle");

		dispatcher.register(eventType, handler);
		dispatcher.notify(productCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
		expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent);
	});
});
