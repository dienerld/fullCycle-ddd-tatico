import {
	Column,
	DataType,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";

@Table({
	tableName: "products",
	timestamps: false,
})
export class ProductModel extends Model {
	@PrimaryKey
	@Column(DataType.STRING)
	declare id: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare name: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare price: number;
}
