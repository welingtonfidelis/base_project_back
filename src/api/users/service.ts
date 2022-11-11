import bcrypt from "bcryptjs";
import { config } from "../../config";

import { AppError } from "../../errors/AppError";
import { userRepository } from "./repository";
import {
  LoginPayload,
  UpdatePasswordPayload,
  UpdateUserPayload,
} from "./types";

const { findByUserName, findByEmail, findById, updateById, list } =
  userRepository;

const { ENCRYPT_SALT } = config;

const userService = {
  async loginService(payload: LoginPayload) {
    const { username, password } = payload;
    let selectedUser = await findByUserName(username);

    if (!selectedUser) selectedUser = await findByEmail(username);

    if (!selectedUser) throw new AppError("Invalid email", 404);

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

  list() {
    return list();
  },
};

export { userService };
