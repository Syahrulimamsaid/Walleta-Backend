import { defineConfig } from "prisma/config";
import { Boolean } from "./../../../generated/prisma/internal/prismaNamespace";
import { request } from "node:http";
import { prismaClient } from "../../application/database";
import { ResponseError } from "../../error/response-error";
import { createTransValidation } from "../../validation/trans-validation";

const get = async (request: any) => {
  const data = await prismaClient.transaction.findMany({
    where: { userId: request.user.id },
    select: {
      id: true,
      amount: true,
      description: true,
      date: true,
      category: { select: { id: true, name: true, type: true } },
      account: { select: { id: true, name: true } },
    },
    orderBy: { date: "desc" },
  });

  const result = Object.values(
    data.reduce(
      (acc, trx) => {
        const dateKey = trx.date.toISOString().split("T")[0];

        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dateKey,
            income: 0,
            expense: 0,
            detail: [],
          };
        }

        acc[dateKey].income += Number(
          trx.category.type == "INCOME" ? trx.amount : 0,
        );
        acc[dateKey].expense += Number(
          trx.category.type == "EXPENSE" ? trx.amount : 0,
        );

        acc[dateKey].detail.push({
          id: trx.id,
          amount: trx.amount,
          description: trx.description,
          date: trx.date,
          category: trx.category,
          account: trx.account,
        });

        return acc;
      },
      {} as Record<string, any>,
    ),
  );

  if (!result) {
    throw new ResponseError(404, "Data not found");
  }
  return result;
};

const create = async (request: any) => {
  const trans = await createTransValidation.validateAsync(request.body);

  const category = await prismaClient.category.findFirst({
    where: { id: trans.categoryId },
    select: { type: true },
  });

  const create = await prismaClient.transaction.create({
    data: {
      date: new Date(trans.date),
      amount: trans.amount,
      description: trans.description,
      type: category?.type == "EXPENSE" ? "CREDIT" : "DEBIT",
      accountId: trans.accountId,
      categoryId: trans.categoryId,
      userId: request.user.id,
    },
    select: {
      id:true,
      date: true,
      amount: true,
      description: true,
      type: true,
      category: { select: { name: true, type: true } },
      account: { select: { name: true } },
    },
  });

  return create;
};

export default { get, create };
