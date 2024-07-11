import Joi from "joi";

const deleteSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export { deleteSchema };
