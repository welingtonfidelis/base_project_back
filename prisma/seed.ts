import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const ENCRYPT_SALT = process.env.ENCRYPT_SALT;

const { ADMIN, MANAGER, USER } = Role;

async function main() {
  const usersA = [
    {
      name: "Admin",
      username: "admin",
      email: "admin@email.com",
      password: bcrypt.hashSync("admin", Number(ENCRYPT_SALT)),
      image_url: '',
      image_key: '',
      is_blocked: false,
      permissions: [ADMIN, MANAGER, USER],
    },
    {
      name: "Gerente",
      email: "gerente@email.com",
      username: "gerente",
      password: bcrypt.hashSync("gerente", Number(ENCRYPT_SALT)),
      image_url: '',
      image_key: '',
      is_blocked: false,
      permissions: [MANAGER, USER],
    },    
    {
      name: "Usuário",
      email: "usuario@email.com",
      username: "usuario",
      password: bcrypt.hashSync("usuario", Number(ENCRYPT_SALT)),
      image_url: '',
      image_key: '',
      is_blocked: false,
      permissions: [USER],
    },    
  ]

  const users = usersA;

  await prisma.user.createMany({
    data: users,
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
