import { Request, Response } from "express";

import packageJson from "../../../package.json";

const healthController = {
  test(req: Request, res: Response) {
    const version = packageJson.version;

    return res.json({ ok: true, version });
  },
};

export { healthController };
