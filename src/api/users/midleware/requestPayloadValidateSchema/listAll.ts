import Joi from "joi";

const listAllSchema = Joi.object({
  page: Joi.number().integer().positive().required(),
  limit: Joi.number().integer().positive().min(10).max(100).required(),
});

export { listAllSchema };