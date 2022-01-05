import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import StoreFrontServer from '../../server/server';

const server = new StoreFrontServer(parseInt(process.env.PORT as unknown as string));
const request = supertest(server.app);

describe('Test responses from order endpoints', () => {
  let user: User;
  let token: string;
  let order: Order;

  // Set test user
  beforeAll(async () => {
    const response = await request.post('/api/users').send({
      user_name: 'Alice',
      first_name: 'Alice',
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

  it('posts to /api/orders with user_id and status="new" (valid params) and creates order', async () => {
    const response = await request
      .post('/api/orders')
      .send({
        user_id: user.id,
        status: 'new'
      })
      .set('Authorization', token);
    order = response.body as Order;

    expect(parseInt(order.user_id as unknown as string)).toEqual(user.id as number);
    expect(order.status).toEqual('new');
  });

  it('gets from /api/orders/:user_id (valid user) the order of the user', async () => {
    const response = await request
      .get(`/api/orders/${user.id}`)
      .set('Authorization', token);

    expect(response.body.length).toEqual(1);
    expect(parseInt(response.body[0].user_id as unknown as string)).toEqual(user.id as number);
    expect(response.body[0].status).toEqual('new');
  });

  it('gets from /api/orders all orders', async () => {
    const response = await request
      .get('/api/orders')
      .set('Authorization', token);

    expect(parseInt(response.body[0].user_id as unknown as string)).toEqual(user.id as number);
    expect(response.body[0].status).toEqual('new');
  });

  // Clean up
  afterAll(async () => {
    await request
      .delete('/orders')
      .send({ id: order.id })
      .set('Authorization', token);

    await request
      .delete('/users')
      .send({ id: user.id })
      .set('Authorization', token);
  });
});
