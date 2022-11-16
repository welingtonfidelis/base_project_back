import { Role } from "@prisma/client";
import { Router } from "express";
import { permissionValidate } from "../../shared/middleware/permissionValidate";
import { httpMessageController } from "./controller";

const { ADMIN, MANAGER } = Role;

const httpMessageRouter = Router();
const { list } = httpMessageController;

// ROUTES WITH PERMISSION VALIDATE
httpMessageRouter.use(permissionValidate([ADMIN, MANAGER]));
httpMessageRouter.get('/http-messages', list);

export { httpMessageRouter };