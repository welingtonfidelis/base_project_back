export const HttpMessageEnum = {
  // GENERIC
  NO_AUTH: {
    name: "NO_AUTH",
    message: "Not authenticated",
    code: 401,
    use: "general validation",
  },

  // USERS
  INVALID_USERNAME_OR_EMAIL: {
    name: "INVALID_USERNAME_OR_EMAIL",
    message: "Invalid username or email",
    code: 404,
    use: "/users;",
  },
  INVALID_PASSWORD: {
    name: "INVALID_PASSWORD",
    message: "Invalid password",
    code: 400,
    use: "/users;",
  },
  INVALID_OLD_PASSWORD: {
    name: "INVALID_OLD_PASSWORD",
    message: "Invalid old password",
    code: 400,
    use: "/users;",
  },
  INVALID_PERMISSION: {
    name: "INVALID_PERMISSION",
    message: "Invalid permission",
    code: 400,
    use: "/users;",
  },
  INVALID_RESET_TOKEN: {
    name: "INVALID_RESET_TOKEN",
    message: "Invalid reset token",
    code: 400,
    use: "/users;",
  },
  BLOCKED_USER: {
    name: "BLOCKED_USER",
    message: "Blocked user",
    code: 400,
    use: "/users;",
  },
  USERNAME_ALREADY_USED: {
    name: "USERNAME_ALREADY_USED",
    message: "Username already in use",
    code: 400,
    use: "/users;",
  },
  EMAIL_ALREADY_USED: {
    name: "EMAIL_ALREADY_USED",
    message: "Email already in use",
    code: 400,
    use: "/users;",
  },
  USER_NOT_FOUND: {
    name: "USER_NOT_FOUND",
    message: "User not found",
    code: 404,
    use: "/users;",
  },
  CAN_NOT_DELETE_YOURSELF: {
    name: "CAN_NOT_DELETE_YOURSELF",
    message: "Can not delete your own user",
    code: 400,
    use: "/users;",
  },
};
