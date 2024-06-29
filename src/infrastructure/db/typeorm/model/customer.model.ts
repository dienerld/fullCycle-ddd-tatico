import {
	Column,
	DataType,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";

@Table({
	tableName: "customer",
	timestamps: false,
})
export class CustomerModel extends Model {
	@PrimaryKey
	@Column({ allowNull: false, type: DataType.STRING })
	declare id: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare name: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare street: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare state: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare city: string;

	@Column({ allowNull: false, type: DataType.STRING })
	declare zip: string;

	@Column({ allowNull: false, type: DataType.BOOLEAN })
	declare active: boolean;

	@Column({ allowNull: false, type: DataType.INTEGER })
	declare rewardPoints: number;
}
