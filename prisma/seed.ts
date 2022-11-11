import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const ENCRYPT_SALT = process.env.ENCRYPT_SALT;

async function main() {
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@email.com",
      username: "admin",
      password: bcrypt.hashSync("admin", Number(ENCRYPT_SALT)),
      is_blocked: false,
      permissions: ["ADMIN", "MANAGER", "USER"],
    },
  });
}

console.log('Seed done 🚀');

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
