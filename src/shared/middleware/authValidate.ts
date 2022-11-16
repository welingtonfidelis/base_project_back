import { NextFunction, Request, Response } from "express";
import { config } from "../../config";
import { AppError } from "../../errors/AppError";
import { validateToken } from "../service/token";

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

    const authenticatedUser = validateToken(token, JSON_SECRET);
    Object.assign(req, { authenticated_user: authenticatedUser });

    return next();
  } catch (error) {
    throw new AppError("Not authenticated", 401);
  }
};

export { authValidate };
