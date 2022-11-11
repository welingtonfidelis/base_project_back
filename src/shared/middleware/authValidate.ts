import { NextFunction, Request, Response } from "express";
import { config } from "../../config";
import { AppError } from "../../errors/AppError";
import { validate } from "../service/token";

const { JSON_SECRET } = config;

const authValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cookies } = req;

  if (!cookies || !cookies.secure_application_cookie) {
    throw new AppError("Not authenticated", 401);
  }

  try {
    const { token } = JSON.parse(cookies.secure_application_cookie);

    console.log('JSON_SECRET: ', JSON_SECRET);
    const authenticatedUser = validate(token, JSON_SECRET);
    Object.assign(req, { authenticated_user: authenticatedUser });

    return next();
  } catch (error) {
    throw new AppError("Invalid token authenticate", 401);
  }
};

export { authValidate };
