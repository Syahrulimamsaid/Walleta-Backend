import { True } from "../../../generated/prisma/internal/prismaNamespace";
import { request } from "node:http";
import { prismaClient } from "../../application/database";
import { ResponseError } from "../../error/response-error";
import { createDebetValidation } from "../../validation/debet-validation";

const get = async (request: any) => {
  const data = await prismaClient.transaction.findMany({
    where: { userId: request.user.id, type: "DEBIT" },
    select: {
      id: true,
      amount: true,
      date: true,
      category: { select: { id: true, name: true } },
      account: { select: { id: true, name: true } },
    },
  });

  if (!data) {
    throw new ResponseError(404, "Data not found");
  }
  return data;
};

const create = async (request: any) => {
  const debit = await createDebetValidation.validateAsync(request.body);
  const data = await prismaClient.transaction.create({
    data: {
      amount: debit.amount,
      type: "DEBIT",
      userId: request.user.id,
      categoryId: debit.categoryId,
      accountId: debit.accountId,
      description: debit.description,
    },
    select: {
      amount: true,
      description: true,
      date: true,
      categoryId: true,
      accountId: true,
    },
  });

  return data;
};

export default { get, create };
