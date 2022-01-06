import { ModelStoreBase } from './modelBase';
import { QueryResult } from 'pg';

export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
}

export class OrderProductStore extends ModelStoreBase<OrderProduct> {
  /**
   * @constructor
   */
  constructor() {
    super('order_products');
  }

  /**
   * Create product inside order in database.
   * @param {OrderProduct} product Product inside order to edit.
   * @param {number} product.order_id Id of the order to add product to.
   * @param {number} product.product_id Id of the product.
   * @param {number} product.quantity Quantity of products to add.
   * @return {Product} Edited product in order.
   */
  async create(product: OrderProduct): Promise<OrderProduct> {
    try {
      const result: QueryResult = await this.runQuery(`INSERT INTO ${this.table} (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`, [product.order_id, product.product_id, product.quantity]);
      return result.rows[0];
    }
    catch (error) {
      throw new Error(`Could not run create query on ${this.table}: ${error}`);
    }
  }

  /**
   * Edit product inside order in database.
   * @param {OrderProduct} product Product inside order to edit.
   * @param {number} product.id Id of the product inside order to edit.
   * @param {number} product.order_id Id of the order to add product to.
   * @param {number} product.product_id Id of the product.
   * @param {number} product.quantity Quantity of products to add.
   * @return {Product} Edited product in order.
   */
  async edit(product: OrderProduct): Promise<OrderProduct> {
    try {
      const result: QueryResult = await this.runQuery(`UPDATE ${this.table} SET order_id = $2, product_id = $3, quantity = $4 WHERE id=$1 RETURNING *`, [product.id, product.order_id, product.product_id, product.quantity]);
      return result.rows[0];
    }
    catch (error) {
      throw new Error(`Could not run edit query on ${this.table}: ${error}`);
    }
  }
}
