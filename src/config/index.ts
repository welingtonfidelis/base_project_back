import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  ENCRYPT_SALT: 10,
  SESSION_DURATION_HOURS: 10,
  JSON_SECRET: process.env.JSON_SECRET as string,
};

export { config };
