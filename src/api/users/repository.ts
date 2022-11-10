import { prisma } from "../../dbCLient";

const userRepository = {
  findByUserNameOrEmail(user_name: string) {
    return prisma.user.findFirst({
      where: { OR: [{ user_name }, { email: user_name }] },
    });
  },

  list() {
    return prisma.user.findMany();
  },
};

export { userRepository };
