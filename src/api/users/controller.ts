import { Request, Response } from "express";
import dateFnsAdd from "date-fns/add";
import bcrypt from "bcryptjs";

import { userService } from "./service";
import { create, validate } from "../../shared/service/token";
import { config } from "../../config";
import {
  GetByIdParams,
  ListAllQuery,
  LoginBody,
  ResetPasswordBody,
  UpdatePasswordBody,
  UpdateResetedPasswordBody,
  UpdateUserBody,
} from "./types";
import { Role } from "@prisma/client";

const {
  getUserByIdService,
  getUserByUsernameService,
  getUserByEmailService,
  updateUserService,
  updatePasswordService,
  resetPasswordService,
  listAllService,
  deleteById,
} = userService;

const { JSON_SECRET, SESSION_DURATION_HOURS } = config;

const userController = {
  async login(req: Request, res: Response) {
    const body = req.body as LoginBody;
    const { username, password } = body;

    let selectedUser = await getUserByUsernameService(username);

    if (!selectedUser) selectedUser = await getUserByEmailService(username);

    if (!selectedUser) {
      return res.status(404).json({ message: "Invalid username or email" });
    }

    if (selectedUser.is_blocked) {
      return res.status(401).json({ message: "Blocked user" });
    }

    const validPassword = bcrypt.compareSync(password, selectedUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

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

  logout(req: Request, res: Response) {
    res.clearCookie("secure_application_cookie");

    return res.status(204).json({});
  },

  async getProfile(req: Request, res: Response) {
    const { id } = req.authenticated_user;

    const selectedUser = await getUserByIdService(id);

    if (!selectedUser) return res.json({});

    const { password, updated_at, ...rest } = selectedUser;

    return res.json(rest);
  },

  async updateProfile(req: Request, res: Response) {
    const { id } = req.authenticated_user;
    const body = req.body as UpdateUserBody;
    const { username, email } = body;
    const { file } = req;

    if (username) {
      const selectedUser = await getUserByUsernameService(username);

      if (selectedUser && selectedUser.id !== id)
        return res
          .status(400)
          .json({ message: "User username already in use" });
    }

    if (email) {
      const selectedUser = await getUserByEmailService(email);

      if (selectedUser && selectedUser.id !== id)
        return res.status(400).json({ message: "User email already in use" });
    }

    await updateUserService({ ...body, file, id });

    return res.status(204).json({});
  },

  async updateProfilePassword(req: Request, res: Response) {
    const { id } = req.authenticated_user;
    const body = req.body as UpdatePasswordBody;
    const { old_password, new_password } = body;

    const selectedUser = await getUserByIdService(id);

    if (!selectedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = bcrypt.compareSync(
      old_password,
      selectedUser.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    await updatePasswordService({ id, new_password });

    return res.status(204).json({});
  },

  async resetPassword(req: Request, res: Response) {
    const body = req.body as ResetPasswordBody;
    const { username, language } = body;

    let selectedUser = await getUserByUsernameService(username);

    if (!selectedUser) selectedUser = await getUserByEmailService(username);

    if (!selectedUser) {
      return res.status(404).json({ message: "Invalid username or email" });
    }

    if (selectedUser.is_blocked) {
      return res.status(401).json({ message: "Blocked user" });
    }

    const { id, name, email } = selectedUser;
    await resetPasswordService({ id, name, email, language });

    return res.status(204).json({});
  },

  async updateResetedPassword(req: Request, res: Response) {
    const { new_password, token } = req.body as UpdateResetedPasswordBody;

    const { id } = validate(token, JSON_SECRET) as any;
    await updatePasswordService({ id, new_password });

    return res.status(204).json({});
  },

  async listAll(req: Request, res: Response) {
    const { id } = req.authenticated_user;
    const { page, limit } = req.query as unknown as ListAllQuery;

    const users = await listAllService({ id, page, limit });
    const response = {
      ...users,
      users: users.users.map((item) => {
        const { password, updated_at, ...rest } = item;
        return rest;
      }),
    };

    return res.json(response);
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params as unknown as GetByIdParams;

    const selectedUser = await getUserByIdService(parseInt(id));

    if (!selectedUser) return res.status(404).json({});

    const { password, updated_at, ...rest } = selectedUser;

    return res.json(rest);
  },

  async updateById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body = req.body as UpdateUserBody;

    if (body.permissions) {
      const { permissions } = req.authenticated_user;
      const hasInvalidPermission =
        body.permissions.includes(Role.ADMIN) &&
        !permissions.includes(Role.ADMIN);

      if (hasInvalidPermission) {
        return res.status(400).json({ message: "Invalid permission" });
      }
    }

    await updateUserService({ ...body, id });

    return res.status(204).json({});
  },

  async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { id: loggedUserId } = req.authenticated_user;

    if (id === loggedUserId) {
      return res.status(400).json({ message: "Cannot delete your own user" });
    }

    await deleteById(id);

    return res.status(204).json({});
  },
};

export { userController };
