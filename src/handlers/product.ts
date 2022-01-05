import { HandlerBase } from './handlerBase';
import { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

export default class ProductHandler extends HandlerBase<Product, ProductStore> {
  /**
   * @constructor
   */
  constructor() {
    super(ProductStore);
  }

  /**
   * Custom create handler.
   * @param {Request} req Server request.
   * @param {Request} req Server response.
   */
  override async create(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(false, req, res, async (req: Request): Promise<Product> => {
        return await this.store.create({
          name: req.body.name,
          price: req.body.price,
          category: req.body.category ?? ''
        });
      });
    }
    catch (error) {
      throw new Error(`Could not handle create: ${error}`);
    }
  }

  /**
   * Custom edit handler.
   * @param {Request} req Server request.
   * @param {Request} req Server response.
   */
  override async edit(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(false, req, res, async (req: Request): Promise<Product> => {
        return await this.store.edit({
          id: req.body.id,
          name: req.body.name,
          price: req.body.price,
          category: req.body.category ?? ''
        });
      });
    }
    catch (error) {
      throw new Error(`Could not handle edit: ${error}`);
    }
  }
}
