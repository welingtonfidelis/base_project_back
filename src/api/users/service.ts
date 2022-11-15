import bcrypt from "bcryptjs";
import fs from "fs";
import handlebars from "handlebars";
import { resolve } from "path";

import { config } from "../../config";
import { AppError } from "../../errors/AppError";
import { sendMail } from "../../shared/service/mail";
import { create } from "../../shared/service/token";
import { userRepository } from "./repository";
import {
  DeleteByIdPayload,
  ListAllIgnoreIdPayload,
  LoginPayload,
  ResetPasswordPayload,
  UpdatePasswordPayload,
  UpdateResetedPasswordPayload,
  UpdateUserPayload,
} from "./types";

const {
  findByUserName,
  findByEmail,
  findById,
  updateById,
  listAllIgnoreId,
  deleteById,
} = userRepository;

const { ENCRYPT_SALT, SOURCE_EMAIL, URL_FRONT_RESET_PASSWORD, JSON_SECRET } =
  config;

const userService = {
  async loginService(payload: LoginPayload) {
    const { username, password } = payload;
    let selectedUser = await findByUserName(username);

    if (!selectedUser) selectedUser = await findByEmail(username);

    if (!selectedUser) throw new AppError("Invalid username or email", 404);

    if (selectedUser.is_blocked) throw new AppError("Blocked user", 404);

    const isPasswordRight = bcrypt.compareSync(password, selectedUser.password);
    if (!isPasswordRight) throw new AppError("Invalid password", 401);

    return selectedUser;
  },

  getUserByIdService(id: number) {
    return findById(id);
  },

  async updateUserService(payload: UpdateUserPayload) {
    const { id, username, email } = payload;

    if (username) {
      const selectedUser = await findByUserName(username);

      if (selectedUser && selectedUser.id !== id)
        throw new AppError("User username already in use", 400);
    }

    if (email) {
      const selectedUser = await findByEmail(email);

      if (selectedUser && selectedUser.id !== id)
        throw new AppError("User email already in use", 400);
    }

    return updateById(payload);
  },

  async updatePasswordService(payload: UpdatePasswordPayload) {
    const { id, old_password, new_password } = payload;

    const selectedUser = await findById(id);

    if (!selectedUser) throw new AppError("User not found", 404);

    const isPasswordRight = bcrypt.compareSync(
      old_password,
      selectedUser.password
    );
    if (!isPasswordRight) throw new AppError("Invalid old password", 401);

    const password = bcrypt.hashSync(new_password, ENCRYPT_SALT);
    return updateById({ id, password });
  },

  async resetPasswordService(payload: ResetPasswordPayload) {
    const { username, language } = payload;

    let selectedUser = await findByUserName(username);

    if (!selectedUser) selectedUser = await findByEmail(username);

    if (!selectedUser) throw new AppError("Invalid username or email", 404);

    const { id, name, email } = selectedUser;
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
    const token = create({ id }, JSON_SECRET, 15);
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

  async updateResetedPasswordService(payload: UpdateResetedPasswordPayload) {
    const { id, new_password } = payload;

    const password = bcrypt.hashSync(new_password, ENCRYPT_SALT);
    return updateById({ id, password });
  },

  listAllService(payload: ListAllIgnoreIdPayload) {
    return listAllIgnoreId(payload);
  },

  deleteById(payload: DeleteByIdPayload) {
    return deleteById(payload);
  },
};

export { userService };
