import type { Address } from "./value-object/address";

export interface CustomerInterface {
	get id(): string;
	get name(): string;
	get address(): Address;
	changeName(name: string): void;
	activate(): void;
	deactivate(): void;
}
