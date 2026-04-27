import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

const get = async (request: any) => {
  const data = await prismaClient.account.findMany({
    where: {
      userId: request.user.id,
    },
    select: {
      id: true,
      name: true,
      balance: true,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Data not found");
  }
  return data;
};

export default { get };
