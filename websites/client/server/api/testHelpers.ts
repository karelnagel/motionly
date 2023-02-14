import { prismaMock } from "../../singleton";
import { appRouter } from "./root";
import prisma from "../db";
export const userId = "userId";

export const authorizedCaller = () => {
  prismaMock.user.create({ data: { id: userId } });
  return appRouter.createCaller({
    session: { user: { id: userId }, expires: "" },
    prisma: prisma,
  });
};
export const unauthorizedCaller = () => {
  return appRouter.createCaller({
    session: null,
    prisma: prisma,
  });
};
