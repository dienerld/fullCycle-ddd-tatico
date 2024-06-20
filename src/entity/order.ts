import { OrderItem } from './order-item';

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
  }

  totalPrice(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
