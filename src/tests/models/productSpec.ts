import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();
let product1: Product;
let product2: Product;

describe('Tests the Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an edit method', () => {
    expect(store.edit).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have a deleteAll method', () => {
    expect(store.deleteAll).toBeDefined();
  });

  it('adds a product with the create method', async () => {
    product1 = await store.create({
      name: 'cheese cake',
      price: 1,
      category: 'food'
    });

    expect(product1.name).toEqual('cheese cake');
    expect(product1.price).toEqual(1);
    expect(product1.category).toEqual('food');

    product2 = await store.create({
      name: 'beer',
      price: 2,
      category: 'beverage'
    });

    expect(product2.name).toEqual('beer');
    expect(product2.price).toEqual(2);
    expect(product2.category).toEqual('beverage');
  });

  it('edits a product with the edit method', async () => {
    const id = product2.id;
    product2 = await store.edit({
      id: id,
      name: 'beer',
      price: 3,
      category: 'beverage'
    });

    expect(product2.name).toEqual('beer');
    expect(product2.price).toEqual(3);
    expect(product2.category).toEqual('beverage');
  });

  it('returns a list of all products with the index method', async () => {
    const result = await store.index();

    expect(result.length).toEqual(2);

    expect(result[0].name).toEqual('cheese cake');
    expect(result[0].price).toEqual(1);
    expect(result[0].category).toEqual('food');

    expect(result[1].name).toEqual('beer');
    expect(result[1].price).toEqual(3);
    expect(result[1].category).toEqual('beverage');
  });

  it('shows a product with the show method', async () => {
    let result = await store.show(product1.id as unknown as string);
    if (Array.isArray(result)) {
      result = result[0];
    }

    expect(result.name).toEqual('cheese cake');
    expect(result.price).toEqual(1);
    expect(result.category).toEqual('food');
  });

  it('deletes a product with the delete method', async () => {
    await store.delete(product1.id as unknown as string);
    const result = await store.index();

    expect(result.length).toEqual(1);
    expect(result[0].name).toEqual('beer');
    expect(result[0].price).toEqual(3);
    expect(result[0].category).toEqual('beverage');
  });

  it('deletes all products with the deleteAll method', async () => {
    await store.deleteAll();
    const result = await store.index();

    expect(result.length).toEqual(0);
  });

  // Clean up
  afterAll(async () => {
    await store.deleteAll();
  });
});
