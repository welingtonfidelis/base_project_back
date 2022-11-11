import Joi from "joi";

const updatePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().min(3).required(),
});

export { updatePasswordSchema };