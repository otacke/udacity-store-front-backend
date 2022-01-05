import { ModelStoreBase } from './modelBase';

export type Order = {
    id?: number;
    user_id: number;
    status: string;
}

export class OrderStore extends ModelStoreBase<Order> {
  /**
   * @constructor
   */
  constructor() {
    super('orders');
  }

  /**
   * Show orders in database.
   * @param {string} id Id of user to show orders for.
   * @return {Order[]} Orders.
   */
  async show(id: string): Promise<Order[]> {
    try {
      id = `${id}`;
      const result = await this.runQuery(`SELECT * FROM ${this.table} WHERE user_id=($1) AND status<>($2)`, [id, 'complete']);
      return result.rows;
    }
    catch (error) {
      throw new Error(`Could not run show query on ${this.table}: ${error}`);
    }
  }

  /**
   * Add order to database.
   * @param {Order} order Order to create.
   * @param {string} order.user_id Id of user to create order for.
   * @param {string} order.status Status of order (e.g. new).
   * @return {Order} Order created.
   */
  async create(order: Order): Promise<Order> {
    try {
      const result = await this.runQuery(`INSERT INTO ${this.table} (user_id, status) VALUES($1, $2) RETURNING *`, [order.user_id, order.status]);
      return result.rows[0];
    }
    catch (error) {
      throw new Error(`Could not run create query on ${this.table}: ${error}`);
    }
  }

  /**
   * Edit order in database.
   * @param {Order} order Order to edit.
   * @param {number} order.id Id of order to be edited.
   * @param {string} order.user_id Id of user to edit order for.
   * @param {string} order.status Status of order (e.g. new).
   * @return {Order} Order edited.
   */
  async edit(order: Order): Promise<Order> {
    try {
      const result = await this.runQuery(`UPDATE ${this.table} SET user_id = $2, status = $3 WHERE id=$1 RETURNING *`, [order.id, order.user_id, order.status]);
      return result.rows[0];
    }
    catch (error) {
      throw new Error(`Could not run edit query on ${this.table}: ${error}`);
    }
  }
}
