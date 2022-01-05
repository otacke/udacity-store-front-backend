import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { User } from '../../models/user';
import StoreFrontServer from '../../server/server';

const server = new StoreFrontServer(parseInt(process.env.PORT as unknown as string));
const request = supertest(server.app);

describe('Tests responses from user endpoints', () => {
  let token: string;
  let user: User;

  it('creates a valid user', async () => {
    const response = await request.post('/api/users').send({
      user_name: 'Alice',
      first_name: 'Alice',
      last_name: 'Liddell',
      password: 'Wonderland'
    });
    token = response.body as string;
    user = jwt.decode(token) as User;

    expect(user.id).toEqual(jasmine.any(Number));
    expect(user.password).toEqual(jasmine.any(String));
    expect(user.user_name).toEqual('Alice');
    expect(user.first_name).toEqual('Alice');
    expect(user.last_name).toEqual('Liddell');
  });

  it('gets from /api/users/:id (valid id) the user with id', async () => {
    const response = await request
      .get(`/api/users/${user.id}`)
      .set('Authorization', token);

    expect(response.body.user_name).toEqual('Alice');
    expect(response.body.first_name).toEqual('Alice');
    expect(response.body.last_name).toEqual('Liddell');
  });

  it('gets from /api/users all of the users', async () => {
    const response = await request
      .get('/api/users')
      .set('Authorization', token);

    expect(response.body[0].user_name).toEqual('Alice');
    expect(response.body[0].first_name).toEqual('Alice');
    expect(response.body[0].last_name).toEqual('Liddell');
  });

  // Clean up
  afterAll(async () => {
    await request
      .delete('/users')
      .send({ id: user.id })
      .set('Authorization', token);
  });
});
