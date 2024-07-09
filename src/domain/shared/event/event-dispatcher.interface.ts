import type { EventHandlerInterface } from "./event-handler.interface";
import type { EventInterface } from "./event.interface";

export interface EventDispatcherInterface {
	notify(event: EventInterface): void;
	register(eventType: string, handler: EventHandlerInterface): void;
	unregister(eventType: string, handler: EventHandlerInterface): void;
	unregisterAll(): void;
}
