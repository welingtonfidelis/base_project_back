import { NextFunction, Request, Response } from "express";

import { config } from "../../config";
import { AppError } from "../../errors/AppError";
import { HttpMessageEnum } from "../enum/httpMessage";
import { validateToken } from "../service/token";

const { JSON_SECRET } = config;
const { NO_AUTH } = HttpMessageEnum;

const authValidate = (req: Request, res: Response, next: NextFunction) => {
  const { cookies } = req;

  if (!cookies || !cookies.secure_application_cookie) {
    throw new AppError(NO_AUTH.message, NO_AUTH.code);
  }

  try {
    const { token } = JSON.parse(cookies.secure_application_cookie);

    const authenticatedUser = validateToken(token, JSON_SECRET);
    Object.assign(req, { authenticated_user: authenticatedUser });

    return next();
  } catch (error) {
    throw new AppError(NO_AUTH.message, NO_AUTH.code);
  }
};

export { authValidate };
