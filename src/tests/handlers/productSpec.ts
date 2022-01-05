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
  let product: Product;

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
    const response = await request
      .post('/api/products')
      .send({
        name: 'Minecraft',
        price: 20,
        category: 'game'
      })
      .set('Authorization', token);
    product = response.body as Product;

    expect(product.name).toEqual('Minecraft');
    expect(product.price).toEqual(20);
    expect(product.category).toEqual('game');
  });

  it('gets from /api/products/:product_id (valid id) the product', async () => {
    const response = await request
      .get(`/api/products/${product.id}`)
      .set('Authorization', token);

    expect(response.body.name).toEqual('Minecraft');
    expect(response.body.price).toEqual(20);
    expect(response.body.category).toEqual('game');
  });

  it('gets from /api/products all of the products', async () => {
    const response = await request
      .get('/api/products')
      .set('Authorization', token);

    expect(response.body[0].name).toEqual('Minecraft');
    expect(response.body[0].price).toEqual(20);
    expect(response.body[0].category).toEqual('game');
  });

  // Clean up
  afterAll(async () => {
    await request
      .delete('/products')
      .send({ id: product.id })
      .set('Authorization', token);

    await request
      .delete('/users')
      .send({ id: user.id })
      .set('Authorization', token);
  });
});
