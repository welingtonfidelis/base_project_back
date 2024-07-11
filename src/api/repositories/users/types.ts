import { Role } from "@prisma/client";

export type ListAllIgnoreIdPayload = {
  logged_user_id: number;
  page: number;
  limit: number;
  filter_by_id?: number;
  filter_by_name?: string;
  filter_by_not_role?: Role[];
};
