import Joi from "joi";

const loginSchema = Joi.object({
  user_name: Joi.string().required(),
  password: Joi.string().required(),
});

export { loginSchema };