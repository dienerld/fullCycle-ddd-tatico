export class Address {
	private _street: string;
	private _city: string;
	private _state: string;
	private _zip: string;

	constructor(street: string, city: string, state: string, zip: string) {
		this._street = street;
		this._city = city;
		this._state = state;
		this._zip = zip;

		this.validate();
	}

	get street(): string {
		return this._street;
	}

	get city(): string {
		return this._city;
	}

	get state(): string {
		return this._state;
	}

	get zip(): string {
		return this._zip;
	}


	toString() {
		return `${this._street}, ${this._city}, ${this._state} ${this._zip}`;
	}

	private validate() {
		if (!this._street || this._street.length === 0) {
			throw new Error("Street is required");
		}
		if (!this._city || this._city.length === 0) {
			throw new Error("City is required");
		}
		if (!this._state || this._state.length === 0) {
			throw new Error("State is required");
		}
		if (!this._zip || this._zip.length === 0) {
			throw new Error("Zip is required");
		}
	}
}
