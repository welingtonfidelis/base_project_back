import { Role, User } from "@prisma/client";

export type CreateUserPayload = {
    name: string;
    email: string;
    username: string;
    password: string;
    is_blocked: boolean;
    permissions: Role[];
};

export type UpdateUserPayload = Partial<User> & {
  id: number;
  delete_image?: "true" | "false";
  file?: Express.Multer.File;
};

export type UpdatePasswordPayload = {
  id: number;
  new_password: string;
};

export type ResetPasswordPayload = {
  id: number;
  name: string;
  email: string;
  language: string;
};

export type UpdateResetedPasswordPayload =  {
  id: number;
  new_password: string;

};

export type ListAllIgnoreIdPayload = {
  logged_user_id: number;
  page: number;
  limit: number;
  filter_by_id?: number;
  filter_by_name?: string;
  filter_by_not_role?: Role[];
};
