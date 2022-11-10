import { Request, Response } from "express";

import { userService } from "./service";

const { loginService } = userService;

const userController = {
  async login(req: Request, res: Response) {
    const { body } = req;
    const response = await loginService(body);

    return res.json(response);
  },
};

export { userController };
