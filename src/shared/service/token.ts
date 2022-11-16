import jwt from "jsonwebtoken";

const createToken = (content: any, secret: string, expiresMinutes?: number) => {
  const options: jwt.SignOptions = {};

  if (expiresMinutes) options.expiresIn = `${expiresMinutes}m`;

  return jwt.sign(content, secret, options);
};

const validateToken = (token: string, secret: string, ignoreExpiration = false) => {
  return jwt.verify(token, secret, { ignoreExpiration });
};

export { createToken, validateToken };
