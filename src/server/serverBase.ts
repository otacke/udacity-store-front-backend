import ServerCreator from './serverCreator';
import express from 'express';

export default class ServerBase {
  public app;
  public port: number;

  /**
   * @constructor
   * @param {number} port Port for server.
   * @param {string} [api_name] Main API name.
   */
  constructor(port: number) {
    this.app = ServerCreator.getInstance().getServer(port);
    this.port = port;

    // Fill req.body with POST query params, body-parser is not required anymore
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Let server start listening.
   */
  public startListening(): void {
    ServerCreator.getInstance().startListening(this.port);
  }
}
