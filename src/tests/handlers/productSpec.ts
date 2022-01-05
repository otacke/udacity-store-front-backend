import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import StoreFrontServer from '../../server/server';

const server = new StoreFrontServer(parseInt(process.env.PORT as unknown as string));
const request = supertest(server.app);

describe('Test responses from product endpoints', () => {
  let user: User;
  let token: string;
  let product1: Product;
  let product2: Product;

  beforeAll(async () => {
    const response = await request
      .post('/api/users')
      .send({
        user_name: 'Alice',
        first_name: 'Bob',
        last_name: 'Liddell',
        password: 'Wonderland'
      });

    token = response.body as string;
    user = jwt.decode(token) as User;
  });

  it('creates a valid user', async () => {
    expect(user.id).toEqual(jasmine.any(Number));
    expect(user.password).toEqual(jasmine.any(String));
  });

  it('posts to /api/products (valid params) and creates a product', async () => {
    let response = await request
      .post('/api/products')
      .send({
        name: 'Minecraft',
        price: 20,
        category: 'game'
      })
      .set('Authorization', token);
    product1 = response.body as Product;

    expect(product1.name).toEqual('Minecraft');
    expect(product1.price).toEqual(20);
    expect(product1.category).toEqual('game');

    response = await request
      .post('/api/products')
      .send({
        name: 'Udacity coding course',
        price: 99,
        category: 'education'
      })
      .set('Authorization', token);
    product2 = response.body as Product;

    expect(product2.name).toEqual('Udacity coding course');
    expect(product2.price).toEqual(99);
    expect(product2.category).toEqual('education');
  });

  it('gets from /api/products/:product_id (valid id) the product', async () => {
    const response = await request
      .get(`/api/products/${product1.id}`)
      .set('Authorization', token);

    expect(response.body.name).toEqual('Minecraft');
    expect(response.body.price).toEqual(20);
    expect(response.body.category).toEqual('game');
  });

  it('gets from /api/products all of the products', async () => {
    const response = await request
      .get('/api/products');

    expect(response.body.length).toEqual(2);
    expect(response.body[0].name).toEqual('Minecraft');
    expect(response.body[0].price).toEqual(20);
    expect(response.body[0].category).toEqual('game');
    expect(response.body[1].name).toEqual('Udacity coding course');
    expect(response.body[1].price).toEqual(99);
    expect(response.body[1].category).toEqual('education');
  });

  it('puts to /api/products/:product_id (valid id) to change parameters', async () => {
    const response = await request
      .put(`/api/products/${product2.id}`)
      .set('Authorization', token)
      .send({
        name: 'Candy',
        price: 1,
        category: 'food'
      });

    expect(response.body.name).toEqual('Candy');
    expect(response.body.price).toEqual(1);
    expect(response.body.category).toEqual('food');
  });

  // Clean up
  afterAll(async () => {
    await request
      .delete('/products')
      .send({ id: product1.id })
      .set('Authorization', token);

    await request
      .delete('/products')
      .send({ id: product2.id })
      .set('Authorization', token);

    await request
      .delete('/users')
      .send({ id: user.id })
      .set('Authorization', token);
  });
});
