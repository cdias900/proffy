// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';
import db from '../database/connection';

class ConnectionController {
  public async index(req: Request, res: Response): Promise<Response> {
    const totalConnection = await db('connections').count('* as total');
    const { total } = totalConnection[0];

    return res.json({ total });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.body;

    await db('connections').insert({
      user_id,
    });

    return res.status(201).send();
  }
}

export default new ConnectionController();
