import Client from '../database';
import { QueryResult } from 'pg';

export abstract class ModelStoreBase<ModelType> {
  protected table: string;

  constructor(table: string) {
    this.table = table;
  }

  /**
   * Run database query.
   * @param {string|number|null} sql SQL query to run.
   * @param {(string|number|undefined)[]} params Query parameters.
   * @return {Promise<QueryResult<ModelType>>} Query result.
   */
  protected async runQuery(sql: string, params?: (string|number|undefined)[]): Promise<QueryResult<ModelType>> {
    try {
      const conn = await Client.connect();
      let result: QueryResult<ModelType>;
      if (params) {
        result = await conn.query(sql, params);
      }
      else {
        result = await conn.query(sql);
      }
      conn.release();

      return result;
    }
    catch (error) {
      throw new Error(`Could not run query: ${error}`);
    }
  }

  /**
   * Get default index result.
   */
  async index(): Promise<ModelType[]> {
    try {
      const result: QueryResult<ModelType> = await this.runQuery(`SELECT * FROM ${this.table}`);
      return result.rows;
    }
    catch (error) {
      throw new Error(`Could not run index query on ${this.table}: ${error}`);
    }
  }

  /**
   * Get default show result.
   * @param {string} id Id.
   * @return {ModelType} Model type (User, Order, etc.).
   */
  async show(id: string): Promise<ModelType|ModelType[]> {
    try {
      const result: QueryResult<ModelType> = await this.runQuery(`SELECT * FROM ${this.table} WHERE id=($1)`, [id]);
      return result.rows[0];
    }
    catch (error) {
      throw new Error(`Could not run show query on ${this.table} for id ${id}: ${error}`);
    }
  }

  /**
   * Get create result. Needs to be implemented.
   * @abstract
   * @param {ModelType} type Model type (User, Order, etc.).
   * @return {ModelType} Model type (User, Order, etc.).
   */
  abstract create(type: ModelType): Promise<ModelType>;

  /**
   * Get edit result. Needs to be implemented.
   * @abstract
   * @param {ModelType} type Model type (User, Order, etc.).
   * @return {ModelType} Model type (User, Order, etc.).
   */
  abstract edit(order: ModelType): Promise<ModelType>;

  async delete(id: string): Promise<ModelType> {
    try {
      const result: QueryResult<ModelType> = await this.runQuery(`DELETE FROM ${this.table} WHERE id=($1)`, [id]);
      return result.rows[0];
    }
    catch (error) {
      throw new Error(`Could not run delete query on ${this.table} for id ${id}: ${error}`);
    }
  }

  /**
   * Delete all entries. Used by tests, no route.
   */
  async deleteAll(): Promise<void> {
    try {
      await this.runQuery(`DELETE FROM ${this.table}`);
    }
    catch (error) {
      throw new Error(`Could not delete all entries in ${this.table}: ${error}`);
    }
  }
}
