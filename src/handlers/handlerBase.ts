import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ModelStoreBase } from '../models/modelBase';

export abstract class HandlerBase<ModelType, ModelStoreType extends ModelStoreBase<ModelType>> {
    protected store: ModelStoreType;

    /**
     * @constructor
     * @param {ModelStoreType} type Store type (user, orders, etc.).
     */
    constructor(type: { new(): ModelStoreType; }) {
      this.store = new type();
    }

    /**
     * Handle request.
     * @param {boolean} useJWT If true, will return JWT as response.
     * @param {Request} req Server request.
     * @param {Response} res Server response.
     * @param {function} storeHandler Actual store handler.
     */
    protected async handleRequest(useJWT: boolean, req: Request, res: Response, storeHandler: (req: Request) => Promise<ModelType|ModelType[]|null>): Promise<void> {
      try {
        const result: string = await storeHandler(req) as unknown as string;
        if (useJWT) {
          res.json(jwt.sign(result, process.env.TOKEN_SECRET as unknown as string));
        } else {
          res.json(result);
        }
      }
      catch (error) {
        res.status(400);
        res.json(error);
      }
    }

    /**
     * Default index handler.
     * @param {Request} req Server request.
     * @param {Request} req Server response.
     */
    async index(req: Request, res: Response): Promise<void> {
      try {
        await this.handleRequest(false, req, res, async (): Promise<ModelType[]> => {
          return await this.store.index();
        });
      }
      catch (error) {
        throw new Error(`Could not handle index: ${error}`);
      }
    }

    /**
     * Default show handler.
     * @param {Request} req Server request.
     * @param {Request} req Server response.
     */
    async show(req: Request, res: Response): Promise<void> {
      try {
        await this.handleRequest(false, req, res, async (req: Request): Promise<ModelType|ModelType[]> => {
          return await this.store.show(req.params.id);
        });
      }
      catch (error) {
        throw new Error(`Could not handle show: ${error}`);
      }
    }

    /**
     * Create handler. Needs to be implemented.
     * @abstract
     * @param {Request} req Server request.
     * @param {Request} req Server response.
     */
    abstract create(req: Request, res: Response): Promise<void>;

    /**
     * Edit handler. Needs to be implemented.
     * @abstract
     * @param {Request} req Server request.
     * @param {Request} req Server response.
     */
    abstract edit(req: Request, res: Response): Promise<void>;

    /**
     * Default delete handler.
     * @param {Request} req Server request.
     * @param {Request} req Server response.
     */
    async delete(req: Request, res: Response): Promise<void> {
      try {
        await this.handleRequest(false, req, res, async (req: Request): Promise<ModelType> => {
          return await this.store.delete(req.params.id);
        });
      }
      catch (error) {
        throw new Error(`Could not handle delete: ${error}`);
      }
    }
}
