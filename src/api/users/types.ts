import { Role, User } from "@prisma/client";

// CONTROLLER
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

// SERVICE
export type CreateUserPayload = CreateUserBody & {};

export type UpdateUserPayload = UpdateUserBody & {
  id: number;
  file?: Express.Multer.File;
};

export type UpdatePasswordPayload = {
  id: number;
  new_password: string;
};

export type ResetPasswordPayload = Omit<ResetPasswordBody, "username"> & {
  id: number;
  name: string;
  email: string;
};

export type UpdateResetedPasswordPayload = Omit<
  UpdateResetedPasswordBody,
  "token"
> & {
  id: number;
};

export type ListAllIgnoreIdPayload = {
  logged_user_id: number;
  page: number;
  limit: number;
  filter_by_id?: number;
  filter_by_name?: string;
  filter_by_not_role?: Role[];
};
