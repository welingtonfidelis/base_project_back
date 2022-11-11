import bcrypt from "bcryptjs";

import { AppError } from "../../errors/AppError";
import { userRepository } from "./repository";
import { RequestLoginPayload, RequestUpdateProfilePayload } from "./types";

const { findByUserName, findByEmail, findById, updateById, list } = userRepository;

const userService = {
  async loginService(payload: RequestLoginPayload){
    const { username, password } = payload;
    let selectedUser = await findByUserName(username);

    if (!selectedUser) selectedUser = await findByEmail(username);

    if (!selectedUser) throw new AppError('Invalid email', 404);
    
    if(selectedUser.is_blocked) throw new AppError("Blocked user", 404);

    const isPasswordRight = bcrypt.compareSync(password, selectedUser.password);
    if(!isPasswordRight) throw new AppError("Invalid password", 401);

    return selectedUser;
  },

  getProfileService(id: number){
    return findById(id);
  },

  async updateProfileService(payload: RequestUpdateProfilePayload){
    const { id, username, email } = payload;

    if (username) {
      const selectedUser = await findByUserName(username);

      if (selectedUser && selectedUser.id !== id) throw new AppError('User username already in use', 400);
    }

    if (email) {
      const selectedUser = await findByEmail(email);

      if (selectedUser && selectedUser.id !== id) throw new AppError('User email already in use', 400);
    }

    return updateById(payload);
  },

  list() {
    return list();
  },
};

export { userService };
