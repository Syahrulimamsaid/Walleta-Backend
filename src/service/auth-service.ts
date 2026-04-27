import { request } from "node:http";
import { LoginValidation } from "../validation/auth-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (request: any) => {
  const user = await LoginValidation.validateAsync(request);

  const userData = await prismaClient.user.findUnique({
    select: { id: true, email: true, password: true },
    where: { email: user.email },
  });

  if (!userData) {
    throw new ResponseError(404, "Email or password wrong");
  }

  const isValid = await bcrypt.compare(user.password, userData.password);
  if (!isValid) {
    throw new ResponseError(404, "Email or password wrong");
  }

  const token = await prismaClient.token.create({
    data: {
      userId: userData.id,
      token: generateAccessToken(userData),
      expired: new Date(new Date().setHours(new Date().getHours() + 2)),
    },
    select: { token: true, expired: true },
  });

  const userResult = await prismaClient.user.findFirst({
    select: {
      id: true,
      email: true,
      name: true,
    },
    where: { id: user.id },
  });

  return { ...userResult, token: token.token, expired: token.expired };
};

const logout = async (request: any) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ResponseError(404, "Token not found");
  }

  await prismaClient.token.deleteMany({
    where: { AND: [{ userId: request.user.id, token: token }] },
  });

  return true;
};

const logked = async (request: any) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ResponseError(404, "Token not found");
  }

  const user = await prismaClient.token.findFirst({
    where: { userId: request.user.id, token: token },
    select: {
      token: true,
      expired: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!user) {
    throw new ResponseError(404, "User not logked");
  }
  return user;
};

const generateAccessToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "2h" },
  );
};

export default {
  login,
  logout,

  logked,
};
