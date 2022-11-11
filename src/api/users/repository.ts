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

  list() {
    return prisma.user.findMany();
  },
};

export { userRepository };
