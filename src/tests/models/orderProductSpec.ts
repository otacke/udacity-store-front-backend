import { OrderProduct, OrderProductStore } from '../../models/orderProduct';
import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const orderProductStore = new OrderProductStore();
let orderProduct1: OrderProduct;
let orderProduct2: OrderProduct;

const orderStore = new OrderStore();
let order1: Order;
let order2: Order;

const userStore = new UserStore();
let user1: User;
let user2: User;

const productStore = new ProductStore();
let product1: Product;
let product2: Product;

describe('Tests the OrderProduct Model', () => {

  beforeAll(async () => {
    user1 = await userStore.create({
      user_name: 'Alice',
      first_name: 'Bob',
      last_name: 'Liddell',
      password: 'Wonderland'
    });

    user2 = await userStore.create({
      user_name: 'Bob',
      first_name: 'Bob',
      last_name: 'Barker',
      password: 'ThePriceIsRight'
    });

    order1 = await orderStore.create({
      user_id: user1.id as number,
      status: 'active'
    });

    order2 = await orderStore.create({
      user_id: user2.id as number,
      status: 'completed'
    });

    product1 = await productStore.create({
      name: 'H5P',
      price: 0,
      category: 'Open Source Software'
    });

    product2 = await productStore.create({
      name: 'Nyan Cat',
      price: 999,
      category: 'animal'
    });
  });

  it('should have an index method', () => {
    expect(orderProductStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderProductStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderProductStore.create).toBeDefined();
  });

  it('should have an edit method', () => {
    expect(orderProductStore.edit).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(orderProductStore.delete).toBeDefined();
  });

  it('should have a deleteAll method for testing', () => {
    expect(orderProductStore.deleteAll).toBeDefined();
  });

  it('adds order products with the create method', async () => {
    orderProduct1 = await orderProductStore
      .create({
        order_id: order1.id as number,
        product_id: product1.id as number,
        quantity: 13
      });

    expect(parseInt(orderProduct1.order_id as unknown as string)).toEqual(order1.id as number);
    expect(parseInt(orderProduct1.product_id as unknown as string)).toEqual(product1.id as number);
    expect(orderProduct1.quantity).toEqual(13);

    orderProduct2 = await orderProductStore.create({
      order_id: order2.id as number,
      product_id: product2.id as number,
      quantity: 99
    });
    expect(parseInt(orderProduct2.order_id as unknown as string)).toEqual(order2.id as number);
    expect(parseInt(orderProduct2.product_id as unknown as string)).toEqual(product2.id as number);
    expect(orderProduct2.quantity).toEqual(99);
  });

  it('edits an order product with the edit method', async () => {
    const id = orderProduct2.id;
    orderProduct2 = await orderProductStore
      .edit({
        id: id,
        order_id: order2.id as number,
        product_id: product2.id as number,
        quantity: 101
      });

    expect(parseInt(orderProduct2.order_id as unknown as string)).toEqual(order2.id as number);
    expect(parseInt(orderProduct2.product_id as unknown as string)).toEqual(product2.id as number);
    expect(orderProduct2.quantity).toEqual(101);
  });

  it('returns a list of order products with the index method', async () => {
    const result = await orderProductStore.index();

    expect(result.length).toEqual(2);

    expect(parseInt(result[0].order_id as unknown as string)).toEqual(order1.id as number);
    expect(parseInt(result[0].product_id as unknown as string)).toEqual(product1.id as number);
    expect(result[0].quantity).toEqual(13);

    expect(parseInt(result[1].order_id as unknown as string)).toEqual(order2.id as number);
    expect(parseInt(result[1].product_id as unknown as string)).toEqual(product2.id as number);
    expect(result[1].quantity).toEqual(101);
  });

  it('shows the order products with the show method', async () => {
    let result = await orderProductStore.show(orderProduct1.id as unknown as string);

    if (Array.isArray(result)) {
      result = result[0];
    }

    expect(parseInt(result.order_id as unknown as string)).toEqual(order1.id as number);
    expect(parseInt(result.product_id as unknown as string)).toEqual(product1.id as number);
    expect(result.quantity).toEqual(13);
  });

  it('deletes an order product with the delete method', async () => {
    await orderProductStore.delete(orderProduct1.id as unknown as string);
    const result = await orderProductStore.index();

    expect(result.length).toEqual(1);
    expect(parseInt(result[0].order_id as unknown as string)).toEqual(order2.id as number);
    expect(parseInt(result[0].product_id as unknown as string)).toEqual(product2.id as number);
    expect(result[0].quantity).toEqual(101);
  });

  it('deletes all order products with the deleteAll method', async () => {
    await orderProductStore.deleteAll();
    const result = await orderProductStore.index();

    expect(result.length).toEqual(0);
  });

  // Clean up
  afterAll(async () => {
    await orderProductStore.deleteAll();
    await orderStore.deleteAll();
    await userStore.deleteAll();
    await productStore.deleteAll();
  });
});
