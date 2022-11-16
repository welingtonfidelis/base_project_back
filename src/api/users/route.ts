import { Router } from "express";
import multer from "multer";

import { userController } from "./controller";
import { payloadValidate } from "../../shared/middleware/payloadValidate";
import {
  deleteSchema,
  getByIdSchema,
  listSchema,
  loginSchema,
  resetPasswordSchema,
  updateSchema,
  createSchema,
  updatedResetedPasswordSchema,
  updateProfilePasswordSchema,
  updateProfileSchema,
} from "./midleware/requestPayloadValidateSchema";
import { permissionValidate } from "../../shared/middleware/permissionValidate";
import { Role } from "@prisma/client";

const { ADMIN, MANAGER } = Role;

const userNoAuthRouter = Router();
const userRouter = Router();
const {
  login,
  logout,
  getProfile,
  updateProfile,
  updateProfilePassword,
  resetPassword,
  updateResetedPassword,
  list,
  getById,
  update,
  delete: deleteById,
  create
} = userController;

// NOT AUTHENTICATED ROUTES
userNoAuthRouter.post("/users/login", payloadValidate(loginSchema), login);
userNoAuthRouter.post("/users/logout", logout);
userNoAuthRouter.post(
  "/users/reset-password",
  payloadValidate(resetPasswordSchema),
  resetPassword
);
userNoAuthRouter.post(
  "/users/update-reseted-password",
  payloadValidate(updatedResetedPasswordSchema),
  updateResetedPassword
);

// AUTHENTICATED ROUTES
userRouter.get("/users/profile", getProfile);
userRouter.patch(
  "/users/profile",
  [multer().single("file"), payloadValidate(updateProfileSchema)],
  updateProfile
);
userRouter.patch(
  "/users/profile/password",
  payloadValidate(updateProfilePasswordSchema),
  updateProfilePassword
);

// ROUTES WITH PERMISSION VALIDATE
userRouter.use(permissionValidate([ADMIN, MANAGER]));
userRouter.get("/users", payloadValidate(listSchema), list);
userRouter.get("/users/:id", payloadValidate(getByIdSchema), getById);
userRouter.patch("/users/:id", payloadValidate(updateSchema), update);
userRouter.post("/users", payloadValidate(createSchema), create);
userRouter.delete("/users/:id", payloadValidate(deleteSchema), deleteById);

export { userNoAuthRouter, userRouter };
