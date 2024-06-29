import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { CustomerModel } from "./customer.model";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

@Table({
	tableName: "order_items",
	timestamps: false,
})
export class OrderItemModel extends Model {
	@PrimaryKey
	@Column(DataType.STRING)
	declare id: string;

	@Column({ allowNull: false, type: DataType.STRING, field: "product_id" })
	@ForeignKey(() => ProductModel)
	declare productId: string;

	@BelongsTo(() => ProductModel)
	declare product: ProductModel;

	@Column({ allowNull: false, type: DataType.STRING, field: "order_id" })
	@ForeignKey(() => OrderModel)
	declare orderId: string;

	@BelongsTo(() => OrderModel)
	declare order: OrderModel;

	@Column({ allowNull: false, type: DataType.INTEGER })
	declare quantity: number;

	@Column({ allowNull: false, type: DataType.STRING })
	declare name: string;

	@Column({ allowNull: false, type: DataType.REAL })
	declare price: number;
}
