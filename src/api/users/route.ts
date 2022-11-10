import { Router } from "express";

import { requestPayloadValidate } from "../../shared/middleware/requestPayloadValidate";
import { userController } from "./controller";
import { loginSchema } from "./midleware/requestPayloadValidateSchema/login";

const userRouter = Router();
const { login } = userController;

userRouter.post('/users/login', requestPayloadValidate(loginSchema), login);

export { userRouter };