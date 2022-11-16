import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { permissionService } from "./service";

const { listPermissionsService } = permissionService;
const { ADMIN } = Role;

const permissionController = {
  list(req: Request, res: Response) {
    let permissions = listPermissionsService();

    const { permissions: loggedUserPermissions } = req.authenticated_user;

    if (!loggedUserPermissions.includes(ADMIN)) {
      permissions = permissions.filter((item) => item !== ADMIN);
    }

    return res.json(permissions);
  },
};

export { permissionController };
