import { HandlerBase } from './handlerBase';
import { Request, Response } from 'express';
import { OrderProduct, OrderProductStore } from '../models/orderProduct';

export default class OrderProductHandler extends HandlerBase<OrderProduct, OrderProductStore> {
  /**
   * @constructor
   */
  constructor() {
    super(OrderProductStore);
  }

  /**
   * Custom create handler.
   * @param {Request} req Server request.
   * @param {Request} req Server response.
   */
  override async create(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(false, req, res, async (req: Request): Promise<OrderProduct> => {
        return await this.store.create({
          order_id: req.body.order_id,
          product_id: req.body.product_id,
          quantity: req.body.quantity
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
      await this.handleRequest(false, req, res, async (req: Request): Promise<OrderProduct> => {
        return await this.store.edit({
          id: parseInt(req.params.id),
          order_id: req.body.order_id,
          product_id: req.body.product_id,
          quantity: req.body.quantity
        });
      });
    }
    catch (error) {
      throw new Error(`Could not handle edit: ${error}`);
    }
  }
}
