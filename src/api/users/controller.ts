import { Request, Response } from "express";
import dateFnsAdd from "date-fns/add";

import { userService } from "./service";
import { create, validate } from "../../shared/service/token";
import { config } from "../../config";
import { deleteFile, uploadImage } from "../../shared/service/file";

const {
  loginService,
  getUserByIdService,
  updateUserService,
  updatePasswordService,
  resetPasswordService,
  updateResetedPasswordService,
  listAllService,
  deleteById,
} = userService;

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

    const { password, updated_at, ...rest } = selectedUser;

    return res.json(rest);
  },

  async updateProfile(req: Request, res: Response) {
    const { id } = req.authenticated_user;
    const { body } = req;

    if (req.file) {
      const { Location, Key } = await uploadImage(
        req.file,
        "profile",
        `user_${id}`
      );

      body.image_url = Location;
      body.image_key = Key;
    } else if (body.delete_image === "true") {
      const selectedUser = await getUserByIdService(id);

      if (selectedUser && selectedUser.image_key) {
        await deleteFile(selectedUser.image_key);
      }

      delete body.delete_image;
      body.image_url = "";
      body.image_key = "";
    }

    await updateUserService({ id, ...body });

    return res.status(204).json({});
  },

  async updateProfilePassword(req: Request, res: Response) {
    const { id } = req.authenticated_user;
    const { body } = req;

    await updatePasswordService({ id, ...body });

    return res.status(204).json({});
  },

  async resetProfilePassword(req: Request, res: Response) {
    const { body } = req;
    await resetPasswordService(body);

    return res.status(204).json({});
  },

  async updateResetedPassword(req: Request, res: Response) {
    const { new_password, token } = req.body;

    const { id } = validate(token, JSON_SECRET) as any;
    await updateResetedPasswordService({ id, new_password });

    return res.status(204).json({});
  },

  async listAll(req: Request, res: Response) {
    const { id } = req.authenticated_user;
    const page = parseInt((req.query?.page as string) ?? "1");
    const limit = parseInt((req.query?.limit as string) ?? "20");

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
    const id = parseInt(req.params.id);

    const selectedUser = await getUserByIdService(id);

    if (!selectedUser) return res.status(404).json({});

    const { password, updated_at, ...rest } = selectedUser;

    return res.json(rest);
  },

  async updateById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { body } = req;

    await updateUserService({ id, ...body });

    return res.status(204).json({});
  },

  async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { id: loggedUserId } = req.authenticated_user;

    if (id === loggedUserId) {
      return res.status(400).json({ message: "Cannot delete your own user" });
    }

    await deleteById({ id });

    return res.status(204).json({});
  },
};

export { userController };
