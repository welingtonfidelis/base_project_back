import { Request, Response } from "express";

import packageJson from "../../../package.json";

const healthController = {
  healthCheck(req: Request, res: Response) {
    const version = packageJson.version;

    return res.json({ server_on: true, version });
  },
};

export { healthController };
