import { Role } from "@prisma/client";

export {};

declare global {
  namespace Express {
    interface Request {
      authenticated_user: {
        id: number;
        permissions: Role[];
      };
    }
  }
}
