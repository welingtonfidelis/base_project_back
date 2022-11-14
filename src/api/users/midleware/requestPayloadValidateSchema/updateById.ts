import { Role } from "@prisma/client";
import Joi from "joi";

const updateByIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  name: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email(),
  permissions: Joi.array().items(Joi.string().valid(...Object.values(Role))),
  is_blocked: Joi.boolean(),
});

export { updateByIdSchema };
