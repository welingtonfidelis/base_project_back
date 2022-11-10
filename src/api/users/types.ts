// LOGIN
export interface RequestLoginPayload {
    user_name: string;
    password: string;
}

export interface ResponseLoginPayload {
    name: string;
    email: string;
    permissions: string[];
}