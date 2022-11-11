import bcrypt from "bcryptjs";

import { AppError } from "../../errors/AppError";
import { userRepository } from "./repository";
import { RequestLoginPayload } from "./types";

const { findByUserNameOrEmail, list } = userRepository;

const userService = {
  async loginService(payload: RequestLoginPayload){
    const { user_name, password } = payload;
    const selectedUser = await findByUserNameOrEmail(user_name);

    if (!selectedUser) throw new AppError('Invalid email', 404);
    
    if(selectedUser.is_blocked) throw new AppError("Blocked user", 404);

    const isPasswordRight = bcrypt.compareSync(password, selectedUser.password);
    if(!isPasswordRight) throw new AppError("Invalid password", 401);

    return selectedUser;
  },

  list() {
    return list();
  },
};

export { userService };
