import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  ENCRYPT_SALT: 10,
  SESSION_DURATION_HOURS: 10,
  JSON_SECRET: process.env.JSON_SECRET as string,
  CORS_DOMAINS: process.env.CORS_DOMAINS as string,
  SOURCE_EMAIL: process.env.SOURCE_EMAIL as string,
  URL_FRONT_RESET_PASSWORD: process.env.URL_FRONT_RESET_PASSWORD,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_REGION: process.env.AWS_REGION,
  BUCKET_NAME: process.env.BUCKET_NAME as string,
};

export { config };
