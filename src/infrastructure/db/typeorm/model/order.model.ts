import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { CustomerModel } from "./customer.model";
import { OrderItemModel } from "./order-item.model";

@Table({
	tableName: "orders",
	timestamps: false,
})
export class OrderModel extends Model {
	@PrimaryKey
	@Column(DataType.STRING)
	declare id: string;

	@Column({ allowNull: false, type: DataType.STRING, field: "customer_id" })
	@ForeignKey(() => CustomerModel)
	declare customerId: string;

	@BelongsTo(() => CustomerModel)
	declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[]

	@Column({ allowNull: false, type: DataType.REAL })
	declare total: number;
}
