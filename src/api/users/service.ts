import bcrypt from "bcryptjs";
import fs from "fs";
import handlebars from "handlebars";
import { resolve } from "path";

import { config } from "../../config";
import { deleteFile, uploadImage } from "../../shared/service/file";
import { sendMail } from "../../shared/service/mail";
import { createToken } from "../../shared/service/token";
import { userRepository } from "./repository";
import {
  CreateUserPayload,
  ListAllIgnoreIdPayload,
  ResetPasswordPayload,
  UpdatePasswordPayload,
  UpdateUserPayload,
} from "./types";

const {
  findByUserName,
  findByEmail,
  findById,
  findByUserNameOrEmail,
  updateById,
  listAllIgnoreId,
  deleteById,
  create,
} = userRepository;

const { ENCRYPT_SALT, SOURCE_EMAIL, URL_FRONT_RESET_PASSWORD, JSON_SECRET } =
  config;

const userService = {
  getUserByIdService(id: number) {
    return findById(id);
  },

  getUserByUsernameService(username: string) {
    return findByUserName(username);
  },

  getUserByEmailService(email: string) {
    return findByEmail(email);
  },

  getUserByUsernameOrEmailService(username: string, email: string) {
    return findByUserNameOrEmail(username, email);
  },

  async updateUserService(payload: UpdateUserPayload) {
    const { id, file, delete_image } = payload;

    if (file) {
      const { Location, Key } = await uploadImage(
        file,
        "profile",
        `user_${id}`
      );

      payload.image_url = Location;
      payload.image_key = Key;
    } else if (delete_image === "true") {
      const selectedUser = await findById(id);

      if (selectedUser && selectedUser.image_key) {
        await deleteFile(selectedUser.image_key);
      }

      payload.image_url = "";
      payload.image_key = "";
    }

    delete payload.delete_image;
    delete payload.file;

    return updateById(id, payload);
  },

  async createUserService(payload: CreateUserPayload) {
    const tempPassword = (Math.random() + 1).toString(36).substring(2);
    const password = bcrypt.hashSync(tempPassword, ENCRYPT_SALT);
    const image_url = "";
    const image_key = "";

    const newUser = await create({
      ...payload,
      password,
      image_url,
      image_key,
    });

    return { ...newUser, password: tempPassword };
  },

  async updateUserPasswordService(payload: UpdatePasswordPayload) {
    const { id, new_password } = payload;

    const password = bcrypt.hashSync(new_password, ENCRYPT_SALT);
    return updateById(id, { password });
  },

  async resetUserPasswordService(payload: ResetPasswordPayload) {
    const { id, name, email, language } = payload;

    const htmlTemplatePath = resolve(
      __dirname,
      "..",
      "..",
      "shared",
      "view",
      "html",
      language,
      "resetPassword.hbs"
    );
    const token = createToken({ id }, JSON_SECRET, 15);
    const htmlTemplate = fs.readFileSync(htmlTemplatePath).toString("utf8");
    const html = handlebars.compile(htmlTemplate)({
      name,
      link: `${URL_FRONT_RESET_PASSWORD}?token=${token}`,
    });

    return sendMail({
      from: SOURCE_EMAIL,
      to: [email],
      subject: "reset password",
      message: html,
    });
  },

  listUsersService(payload: ListAllIgnoreIdPayload) {
    return listAllIgnoreId(payload);
  },

  deleteUserService(id: number) {
    return deleteById(id);
  },
};

export { userService };
