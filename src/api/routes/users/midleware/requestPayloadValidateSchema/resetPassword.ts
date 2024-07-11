import Joi from "joi";

const resetPasswordSchema = Joi.object({
  username: Joi.string().required(),
  language: Joi.string().valid('pt', 'en').required(),
});

export { resetPasswordSchema };