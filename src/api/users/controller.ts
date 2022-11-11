import { Request, Response } from "express";
import dateFnsAdd from "date-fns/add";

import { userService } from "./service";
import { create } from "../../shared/service/token";
import { config } from "../../config";

const { loginService } = userService;

const { JSON_SECRET, SESSION_DURATION_HOURS } = config;

const userController = {
  async login(req: Request, res: Response) {
    const { body } = req;
    const selectedUser = await loginService(body);

    const { id, name, email, permissions } = selectedUser;
    const cookieData = create({ id, permissions }, JSON_SECRET, SESSION_DURATION_HOURS * 60 + 1);
    
    res.cookie(
      "secure_application_cookie",
      JSON.stringify({ token: cookieData }),
      {
        httpOnly: true,
        expires: dateFnsAdd(new Date(), { hours: SESSION_DURATION_HOURS }),
      }
    );

    return res.json({ name, email, permissions });
  },

  profile(req: Request, res: Response) {
    const cookies = req.cookies;
    return res.json({});
  },
};

export { userController };
