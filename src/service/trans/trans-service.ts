import { request } from "node:http";
import { prismaClient } from "../../application/database";
import { ResponseError } from "../../error/response-error";
import { createDebetValidation } from "../../validation/debet-validation";

const get = async (request: any) => {
  const data = await prismaClient.transaction.findMany({
    where: { userId: request.user.id },
    select: {
      id: true,
      amount: true,
      description:true,
      date: true,
      category: { select: { id: true, name: true, type: true } },
      account: { select: { id: true, name: true } },
    },
    orderBy: { date: "desc" },
  });

  if (!data) {
    throw new ResponseError(404, "Data not found");
  }
  return data;
};

export default { get };
