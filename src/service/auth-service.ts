import { LoginValidation } from "../validation/auth-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (request: any) => {
  const user = await LoginValidation.validateAsync(request);

  const userData = await prismaClient.user.findUnique({
    where: { email: user.email },
  });

  if (!userData) {
    throw new ResponseError(404, "Email or password wrong");
  }

  const isValid = await bcrypt.compare(user.password, userData.password);
  if (!isValid) {
    throw new ResponseError(404, "Email or password wrong");
  }

  const token = generateAccessToken(userData);

  const userUpdate = await prismaClient.user.update({
    where: { email: user.email },
    data: { token: token },
    select: {
      email: true,
      name: true,
      token: true,
    },
  });

  return userUpdate;
};

const logout = async (token: string) => {
  await prismaClient.removeTokens.create({
    data: { token: token, expired: new Date() },
  });

  return true;
};
const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
};

const logked = async (token: string) => {
  if (!token) {
    throw new ResponseError(404, "Token not found");
  } 

  const user = await prismaClient.user.findFirst({
    where: {
      AND: [{ token: token }, { token: { not: null } }],
    },
    select: {
      email: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not logked");
  }
  return user;
};

export default {
  login,
  logout,

  logked,
};
