import { Role } from "@prisma/client";
import { Router } from "express";

import { httpMessageController } from "../../controllers/httpMessages";
import { permissionValidate } from "../../../shared/middleware/permissionValidate";

const { ADMIN, MANAGER } = Role;

const httpMessageRouter = Router();
const { list } = httpMessageController;

// ROUTES WITH PERMISSION VALIDATE
httpMessageRouter.use(permissionValidate([ADMIN, MANAGER]));
httpMessageRouter.get("/", list);

export { httpMessageRouter };
