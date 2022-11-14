import { Router } from "express";
import multer from "multer";

import { userController } from "./controller";
import { authValidate } from "../../shared/middleware/authValidate";
import { payloadValidate } from "../../shared/middleware/payloadValidate";
import {
    deleteByIdSchema,
    getByIdSchema,
  listAllSchema,
  loginSchema,
  resetPasswordSchema,
  updateByIdSchema,
  updatedResetedPasswordSchema,
  updateProfilePasswordSchema,
  updateProfileSchema,
} from "./midleware/requestPayloadValidateSchema";
import { permissionValidate } from "../../shared/middleware/permissionValidate";
import { Role } from "@prisma/client";

const { ADMIN, MANAGER, USER } = Role;

const userNoAuthRouter = Router();
const userAuthRouter = Router();
const {
  login,
  getProfile,
  updateProfile,
  updateProfilePassword,
  resetProfilePassword,
  updateResetedPassword,
  listAll,
  getById,
  updateById,
  deleteById
} = userController;

// NOT AUTHENTICATED ROUTES
userNoAuthRouter.post("/users/login", payloadValidate(loginSchema), login);
userNoAuthRouter.post(
  "/users/reset-password",
  payloadValidate(resetPasswordSchema),
  resetProfilePassword
);
userNoAuthRouter.post(
  "/users/update-reseted-password",
  payloadValidate(updatedResetedPasswordSchema),
  updateResetedPassword
);

// AUTHENTICATED ROUTES
userAuthRouter.use(authValidate);
userAuthRouter.get("/users/profile", getProfile);
userAuthRouter.patch(
  "/users/profile",
  [multer().single("file"), payloadValidate(updateProfileSchema)],
  updateProfile
);
userAuthRouter.patch(
  "/users/profile/password",
  payloadValidate(updateProfilePasswordSchema),
  updateProfilePassword
);

// ROUTES WITH PERMISSION VALIDATE
userAuthRouter.use(permissionValidate([ADMIN, MANAGER]));
userAuthRouter.get("/users", payloadValidate(listAllSchema), listAll);
userAuthRouter.get("/users/:id", payloadValidate(getByIdSchema), getById);
userAuthRouter.patch("/users/:id", payloadValidate(updateByIdSchema), updateById);
userAuthRouter.delete("/users/:id", payloadValidate(deleteByIdSchema), deleteById);

export { userNoAuthRouter, userAuthRouter };
