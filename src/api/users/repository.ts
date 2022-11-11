import { User } from "@prisma/client";
import { prisma } from "../../dbCLient";
import { RequestUpdateProfilePayload } from "./types";

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

  updateById(payload: RequestUpdateProfilePayload) {
    const { id, ...data } = payload;

    return prisma.user.update({ where: { id }, data });
  },

  list() {
    return prisma.user.findMany();
  },
};

export { userRepository };
