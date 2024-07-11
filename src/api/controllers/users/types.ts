import { Role, User } from "@prisma/client";

export type CreateUserBody = {
  name: string;
  email: string;
  username: string;
  password: string;
  is_blocked: boolean;
  permissions: Role[];
};

export type UpdateUserBody = Partial<User> & {
  delete_image?: "true" | "false";
};

export type LoginBody = {
  username: string;
  password: string;
};

export type UpdatePasswordBody = {
  old_password: string;
  new_password: string;
};

export type ResetPasswordBody = {
  username: string;
  language: string;
};

export type UpdateResetedPasswordBody = {
  new_password: string;
  token: string;
};
