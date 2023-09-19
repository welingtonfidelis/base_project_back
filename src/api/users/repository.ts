import { User } from "@prisma/client";
import { prisma } from "../../dbCLient";
import { ListAllIgnoreIdPayload, UpdateUserPayload } from "./types";

const userRepository = {
  findByUserName(username: string) {
    return prisma.user.findFirst({
      where: { username },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
    });
  },

  findByUserNameOrEmail(username: string, email: string) {
    return prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
  },

  findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  updateById(id: number, data: Partial<User>) {
    return prisma.user.update({ where: { id }, data });
  },

  create(data: Omit<User, "id" | "created_at" | "updated_at">) {
    return prisma.user.create({ data });
  },

  async listAllIgnoreId(payload: ListAllIgnoreIdPayload) {
    const { logged_user_id, page, limit, filter_by_id, filter_by_name, filter_by_not_role } = payload;
    const offset = (page - 1) * limit;

    const where: any = { AND: [] };

    if (filter_by_id && filter_by_id !== logged_user_id) {
      where.AND.push({ id: filter_by_id });
    } else where.AND.push({ id: { not: logged_user_id } });

    if (filter_by_name) {
      where.AND.push({
        name: { contains: filter_by_name, mode: "insensitive" },
      });
    }

    if (filter_by_not_role) {
      where.AND.push(
        { NOT: { permissions: { hasSome: filter_by_not_role}}}
      )
    }

    const total = await prisma.user.count({ where });

    const users = await prisma.user.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: {
        name: "asc",
      },
    });

    return { users, total };
  },

  deleteById(id: number) {
    return prisma.user.delete({ where: { id } });
  },
};

export { userRepository };
