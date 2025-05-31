type Customer = {
	id: string;
	name: string;
	address: {
		street: string;
		number: string;
		zip: string;
		city: string;
		state: string;
	};
};

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
	customers: Customer[];
	total: number;
}
