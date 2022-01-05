import express, { Express } from 'express';

type ServerStorage = {
  server: Express;
  listening: boolean;
};

export default class ServerCreator {
  private static instance: ServerCreator;
  private serverStorage: Map<number, ServerStorage>;

  /**
   * @constructor
   */
  private constructor() {
    this.serverStorage = new Map();
  }

  /**
   * Get ServerCreator instance.
   */
  public static getInstance(): ServerCreator {
    if (!ServerCreator.instance) {
      ServerCreator.instance = new ServerCreator();
    }

    return ServerCreator.instance;
  }

  /**
   * Get server.
   * @param {number} port Port.
   * @return {Express} Express server.
   */
  public getServer(port: number): Express {
    let storage = this.serverStorage.get(port);

    if (!storage) {
      const server = express();
      storage = { server: server, listening: false };
      this.serverStorage.set(port, storage);
    }

    return storage.server;
  }

  /**
   * Start listening.
   * @param {number} port Port to listen at.
   */
  public startListening(port: number): void {
    const storage = this.serverStorage.get(port);
    if (!storage) {
      return;
    }

    if (!storage.listening) {
      storage.listening = true;
      storage.server.listen(port, () => {
        console.log('Server listening on port ' + port + '!');
      });
    }
  }
}
