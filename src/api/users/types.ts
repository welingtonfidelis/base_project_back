import { User } from "@prisma/client";

// CONTROLLER
export type UpdateUserParams = {
  id: number;
}

export type UpdateUserBody = Partial<User> & {
  delete_image?: 'true' | 'false';
}

export type LoginBody = {
  username: string;
  password: string;
}

export type UpdatePasswordBody = {
  old_password: string;
  new_password: string;
}

export type ResetPasswordBody = {
  username: string;
  language: string;
}

export type UpdateResetedPasswordBody = {
  new_password: string;
  token: string;
}

export type ListAllQuery = {
  page: number;
  limit: number;
  filter_by_id?: number;
  filter_by_name?: string;
}

export type GetByIdParams = {
  id: string;
}

export type DeleteByIdParams = {
  id: string;
}

// SERVICE
export type UpdateUserPayload = UpdateUserBody & {
  id: number;
  file?: Express.Multer.File;
}

export type UpdatePasswordPayload = {
  id: number;
  new_password: string;
}

export type ResetPasswordPayload = Omit<ResetPasswordBody, 'username'> & {
  id: number;
  name: string;
  email: string;
}

export type UpdateResetedPasswordPayload = Omit<UpdateResetedPasswordBody, 'token'> & {
  id: number;
}

export type ListAllIgnoreIdPayload = ListAllQuery & {
  id: number;
}
