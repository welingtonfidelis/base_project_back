import { User } from "@prisma/client";

// LOGIN
export interface RequestLoginPayload {
    username: string;
    password: string;
}

// PROFILE
export interface RequestUpdateProfilePayload extends Partial<User> {
    id: number;
}
