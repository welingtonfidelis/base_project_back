import { User } from "@prisma/client";

// LOGIN
export interface LoginPayload {
    username: string;
    password: string;
}

// PROFILE
export interface UpdateUserPayload extends Partial<User> {
    id: number;
}

export interface UpdatePasswordPayload {
    id: number;
    old_password: string;
    new_password: string;
}