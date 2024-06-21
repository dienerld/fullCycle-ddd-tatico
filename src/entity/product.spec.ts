import { Product } from './product';

describe('Product', () => {
  it('should throw an error when id is empty', () => {
    expect(() => new Product('', 'Product 1', 10)).toThrowError(
      'Id is required',
    );
  });

  it('should error when name is empty', () => {
    expect(() => new Product('1', '', 10)).toThrowError('Name is required');
  });

  it('should throw error when price is less then zero', () => {
    expect(() => new Product('1', 'Product 1', -1)).toThrowError(
      'Price must be greater than zero',
    );
  });

  it('should change name', () => {
    const product = new Product('1', 'Product 1', 10);

    product.changeName('Product 2');

    expect(product.name).toBe('Product 2');
  });

  it('should change price', () => {
    const product = new Product('1', 'Product 1', 10);

    product.changePrice(20);

    expect(product.price).toBe(20);
  });
});
