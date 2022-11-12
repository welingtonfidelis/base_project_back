import Joi from "joi";

const updatedResetedPasswordSchema = Joi.object({
  new_password: Joi.string().min(3).required(),
  token: Joi.string().required(),
});

export { updatedResetedPasswordSchema };