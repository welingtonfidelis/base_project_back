import { User } from "@prisma/client";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UpdateUserPayload extends Partial<User> {
  id: number;
  file?: Express.Multer.File;
}

export interface UpdatePasswordPayload {
  id: number;
  old_password: string;
  new_password: string;
}

export interface ResetPasswordPayload {
  username: string;
  language: string;
}

export interface UpdateResetedPasswordPayload {
  id: number;
  new_password: string;
}

export interface ListAllIgnoreIdPayload {
  id: number;
  page: number;
  limit: number;
}
export interface DeleteByIdPayload {
  id: number;
}
