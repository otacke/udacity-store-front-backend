import ServerBase from './serverBase';
import routes from './routes/index';

export default class Server extends ServerBase {
  /**
   * @constructor
   * @param {number} port Port.
   */
  constructor(port: number) {
    super(port);

    this.app.use(routes);
  }
}
