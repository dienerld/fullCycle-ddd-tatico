import { Address } from './address';

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._active = false;
    this.validate();
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error('Address is mandatory to activate customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  setAddress(address: Address) {
    this._address = address;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  isActive(): boolean {
    return this._active;
  }

  private validate() {
    if (!this._id || this._id.length === 0) {
      throw new Error('Invalid id');
    }

    if (!this._name || this._name.length === 0) {
      throw new Error('Name is required');
    }

    // if (!this._address) {
    //   throw new Error('Address is required');
    // }
  }
}
