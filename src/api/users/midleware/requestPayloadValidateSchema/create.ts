import { Role } from "@prisma/client";
import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  permissions: Joi.array().items(Joi.string().valid(...Object.values(Role))).required(),
  is_blocked: Joi.boolean().required(),
});

export { createSchema };
