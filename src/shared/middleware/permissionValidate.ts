import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { AppError } from "../../errors/AppError";

const permissionValidate = (permissionTest: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { permissions } = req.authenticated_user;

    if (!permissions) throw new AppError("Insufficient permissions", 401);

    const hasPermission =
      !permissionTest.length ||
      permissions.some((item) => permissionTest.includes(item as Role));

    if (!hasPermission) throw new AppError("Insufficient permissions", 401);

    next();
  };
};

export { permissionValidate };
