import { OrderItem } from './order-item';

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;
  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate();
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.total(), 0);
  }

  private validate() {
    if (!this._id || this._id.length === 0) {
      throw new Error('Id is required');
    }

    if (!this._customerId || this._customerId.length === 0) {
      throw new Error('CustomerId is required');
    }

    if (!this._items || this._items.length === 0) {
      throw new Error('Items are required');
    }

    this._items.forEach((item) => {
      if (item.quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
      }
    });
  }
}
