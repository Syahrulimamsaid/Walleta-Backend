import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";

const get = async (request: any) => {
  const data = await prismaClient.category.findMany({
    where: {
      userId: request.user.id,
      ...(request.params.type && { type: request.params.type }),
    },
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  if (!data) {
    throw new ResponseError(404, "Data not found");
  }
  return data;
};

export default { get };
