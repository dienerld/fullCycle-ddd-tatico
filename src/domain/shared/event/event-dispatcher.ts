import type { EventDispatcherInterface } from "./event-dispatcher.interface";
import type { EventHandlerInterface } from "./event-handler.interface";
import type { EventInterface } from "./event.interface";

export class EventDispatcher implements EventDispatcherInterface {
	private eventsMap: Map<string, Set<EventHandlerInterface>> = new Map();
	notify(event: EventInterface): void {
		const handlers = this.eventsMap.get(event.constructor.name) ?? new Set();
		for (const handler of handlers) {
			handler.handle(event);
		}
	}
	register(eventType: string, handler: EventHandlerInterface): void {
		const handlers = this.eventsMap.get(eventType) ?? new Set();
		handlers.add(handler);
		this.eventsMap.set(eventType, handlers);
	}
	unregister(eventType: string, handler: EventHandlerInterface): void {
		const handlers = this.eventsMap.get(eventType);
		if (handlers) {
			handlers.delete(handler);
		}
	}
	unregisterAll(): void {
		this.eventsMap.clear();
	}

	getHandlers(): Map<string, Set<EventHandlerInterface>> {
		return this.eventsMap;
	}
}
