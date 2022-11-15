import { User } from "@prisma/client";
import { prisma } from "../../dbCLient";
import { ListAllIgnoreIdPayload, UpdateUserPayload } from "./types";

const userRepository = {
  findByUserName(username: string) {
    return prisma.user.findFirst({
      where: { OR: [{ username }] },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { OR: [{ email }] },
    });
  },

  findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  updateById(id: number, data: Partial<User>) {
    return prisma.user.update({ where: { id }, data });
  },

  async listAllIgnoreId(payload: ListAllIgnoreIdPayload) {
    const { id, page, limit } = payload;
    const offset = (page - 1) * limit;

    const total = await prisma.user.count({ where: { id: { not: id } } });

    const users = await prisma.user.findMany({
      where: { id: { not: id } },
      skip: offset,
      take: limit,
    });

    return { users, total };
  },

  deleteById(id: number) {
    return prisma.user.delete({ where: { id } });
  },
};

export { userRepository };
