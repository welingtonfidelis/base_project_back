import { Role } from "@prisma/client";
import { Router } from "express";
import { permissionValidate } from "../../shared/middleware/permissionValidate";
import { permissionController } from "./controller";

const { ADMIN, MANAGER } = Role;

const permissionRouter = Router();
const { list } = permissionController;

// ROUTES WITH PERMISSION VALIDATE
permissionRouter.use(permissionValidate([ADMIN, MANAGER]));
permissionRouter.get('/permissions', list);

export { permissionRouter };