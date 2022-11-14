import Joi from "joi";

const deleteByIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export { deleteByIdSchema };
