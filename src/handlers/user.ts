import { HandlerBase } from './handlerBase';
import { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

export default class UserHandler extends HandlerBase<User, UserStore> {
  /**
   * @constructor
   */
  constructor() {
    super(UserStore);
  }

  /**
   * Custom create handler.
   * @param {Request} req Server request.
   * @param {Request} req Server response.
   */
  override async create(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(true, req, res, async (req: Request): Promise<User> => {
        return await this.store.create({
          user_name: req.body.user_name,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: req.body.password
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
      await this.handleRequest(false, req, res, async (req: Request): Promise<User> => {
        return await this.store.edit({
          id: parseInt(req.params.id),
          user_name: req.body.user_name,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: req.body.password
        });
      });
    }
    catch (error) {
      throw new Error(`Could not handle edit: ${error}`);
    }
  }

  /**
   * Authenticate handler.
   * @param {Request} req Server request.
   * @param {Request} req Server response.
   */
  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      await this.handleRequest(true, req, res, async (req: Request): Promise<User|null> => {
        return await this.store.authenticate(req.body.user_name, req.body.password);
      });
    }
    catch (error) {
      throw new Error(`Could not handle authenticate: ${error}`);
    }
  }
}
