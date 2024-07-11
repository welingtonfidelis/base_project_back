import { Role } from "@prisma/client";

const permissionService = {
  listPermissionsService() {
    return Object.values(Role);
  },
};

export { permissionService };
