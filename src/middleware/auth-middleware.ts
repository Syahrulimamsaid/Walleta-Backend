import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database";

const authMiddleware = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const blackList = await prismaClient.removeTokens.findFirst({
    where: { token: token },
  });
  if (blackList) return res.status(401).json({ message: "Unauthorized" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
