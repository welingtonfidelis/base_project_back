import { Role } from "@prisma/client";
import { Router } from "express";

import { permissionController } from "../../controllers/permissions";
import { permissionValidate } from "../../../shared/middleware/permissionValidate";

const { ADMIN, MANAGER } = Role;

const permissionRouter = Router();
const { list } = permissionController;

// ROUTES WITH PERMISSION VALIDATE
permissionRouter.use(permissionValidate([ADMIN, MANAGER]));
permissionRouter.get("/", list);

export { permissionRouter };
