import { HandlerBase } from './handlerBase';
import { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

export default class OrderHandler extends HandlerBase<Order, OrderStore> {

  /**
   * @constructor
   */
  constructor() {
    super(OrderStore);
  }

  /**
   * Custom show handler.
   * @param {Request} req Server request.
   * @param {Request} req Server response.
   */
  override async show(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(false, req, res, async (req: Request): Promise<Order[]> => {
        return await this.store.show(req.params.user_id);
      });
    }
    catch (error) {
      throw new Error(`Could not handle show: ${error}`);
    }
  }

  /**
   * Custom create handler.
   * @param {Request} req Server request.
   * @param {Request} req Server response.
   */
  override async create(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(false, req, res, async (req: Request): Promise<Order> => {
        return await this.store.create({
          user_id: req.body.user_id,
          status: req.body.status ?? 'active'
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
      await this.handleRequest(false, req, res, async (req: Request): Promise<Order> => {
        return await this.store.edit({
          id: parseInt(req.params.id),
          user_id: req.body.user_id,
          status: req.body.status ?? 'active'
        });
      });
    }
    catch (error) {
      throw new Error(`Could not handle edit: ${error}`);
    }
  }
}
