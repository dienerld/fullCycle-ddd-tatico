export interface InputCreateCustomerDto {
	name: string;
	address: {
		street: string;
		number?: string;
		zip: string;
		city: string;
		state: string;
	};
}
export interface OutputCreateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    zip: string;
    city: string;
    state: string;
  };
}
