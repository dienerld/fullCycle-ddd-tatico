import type { Order } from "../entity/order";
import type { RepositoryInterface } from "./repository-interface";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
