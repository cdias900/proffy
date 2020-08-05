import express from 'express';

import routes from './routes';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    // this.database();
    // this.routes();
  }

  private middlewares(): void {
    this.express.use(routes);
  }

  // private database(): void {

  // }

  // private routes(): void {

  // }
}

export default new App().express;
