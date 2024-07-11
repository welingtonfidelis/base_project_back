import { Request, Response } from "express";

const healthController = {
  healthCheck(req: Request, res: Response) {
    const version = 1;

    return res.json({ server_on: true, version });
  },
};

export { healthController };
