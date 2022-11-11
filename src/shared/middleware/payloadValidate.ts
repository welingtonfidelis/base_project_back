import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { AppError } from "../../errors/AppError";

const payloadValidate = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const input = { ...req.body, ...req.params, ...req.query };
    const options = {
      abortEarly: false,
    };
    const { error } = schema.validate(input, options);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((item) => item.message.replace(/['"]+/g, ""));

      throw new AppError(message, 400);
    }
  };
};

export { payloadValidate };
