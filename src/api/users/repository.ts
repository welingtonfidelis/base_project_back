import { prisma } from "../../dbCLient";
import { UpdateUserPayload } from "./types";

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

  updateById(payload: UpdateUserPayload) {
    const { id, ...data } = payload;

    return prisma.user.update({ where: { id }, data });
  },

  async listAllIgnoreId(id: number, page: number, limit: number) {
    const offset = (page - 1) * limit;

    const total = await prisma.user.count({ where: { id: { not: id } } });

    const users = await prisma.user.findMany({
      where: { id: { not: id } },
      skip: offset,
      take: limit,
    });

    return { users, total };
  },
};

export { userRepository };
