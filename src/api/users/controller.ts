import { Request, Response } from "express";
import dateFnsAdd from "date-fns/add";

import { userService } from "./service";
import { create } from "../../shared/service/token";
import { config } from "../../config";

const { loginService, getUserByIdService, updateUserService, updatePasswordService } = userService;

const { JSON_SECRET, SESSION_DURATION_HOURS } = config;

const userController = {
  async login(req: Request, res: Response) {
    const { body } = req;
    const selectedUser = await loginService(body);

    const { id, name, email, permissions } = selectedUser;
    const cookieData = create(
      { id, permissions },
      JSON_SECRET,
      SESSION_DURATION_HOURS * 60 + 1
    );

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

  async getProfile(req: Request, res: Response) {
    const { id } = req.authenticated_user;

    const selectedUser = await getUserByIdService(id);

    if (!selectedUser) return res.json({});

    const { name, email, username, permissions, created_at } = selectedUser;

    return res.json({
      id,
      name,
      email,
      username,
      permissions,
      created_at,
    });
  },

  async updateProfile(req: Request, res: Response) {
    const { id } = req.authenticated_user;
    const { body } = req;

    await updateUserService({ id, ...body });

    return res.status(204).json({});
  },

  async updateProfilePassword(req: Request, res: Response) {
    const { id } = req.authenticated_user;
    const { body } = req;

    await updatePasswordService({ id, ...body });

    return res.status(204).json({});
  },
};

export { userController };
