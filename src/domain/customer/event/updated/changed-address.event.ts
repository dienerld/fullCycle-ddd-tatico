import type { EventInterface } from "@/domain/shared/event/event.interface";
import type { Customer } from "../../entity/customer";

export class ChangedAddressEvent implements EventInterface {
  readonly dateTimeOccurred = new Date();
  constructor(readonly eventData: Customer) {}
}
